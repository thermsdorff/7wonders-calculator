import { Button, List, Switch } from "react-native-paper";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import db from "../services/database";
import { extensionsRepository } from "../repositories";

export const Settings = ({ navigation }) => {
  const [extensions, setExtensions] = useState([]);

  const fetchExtensions = async () => {
    const result = await extensionsRepository.getAll();
    setExtensions(result);
  };

  const updateExtension = async (id, value) => {
    await extensionsRepository.update(id, value);
    const newExtension = extensions.map((item) => {
      if (item.id === id) {
        return { ...item, ...value };
      }

      return item;
    });
    console.log(newExtension);
    setExtensions(newExtension);
  };

  useEffect(() => {
    fetchExtensions();
  }, []);

  const items = extensions.map((item) => (
    <List.Item
      key={item.id}
      title={item.name}
      right={() => (
        <Switch
          value={item.status}
          onValueChange={() => {
            updateExtension(item.id, { status: !item.status });
          }}
        />
      )}
    />
  ));

  return (
    <SafeAreaView>
      <List.Accordion
        title="Extensions"
        description="Indiquez les extensions que vous possédez"
        expanded
      >
        {items}
      </List.Accordion>
      <List.Accordion title="Système" description="Options avancées">
        <Button
          style={styles.button}
          mode="contained"
          buttonColor="red"
          uppercase
          onPress={async () => {
            await db.dropDatabase();
            await db.destroy();
            await db.initialize();
            await fetchExtensions();
          }}
        >
          Réinitialiser la base de donnée
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          uppercase
          onPress={async () => {
            await Sharing.shareAsync(
              `${FileSystem.documentDirectory}SQLite/7wonders-calculator`
            );
          }}
        >
          Exporter la base de donnée
        </Button>
      </List.Accordion>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    margin: 30,
  },
});
