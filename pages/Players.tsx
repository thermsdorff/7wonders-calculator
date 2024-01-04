import { useCallback, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, FAB, useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { PlayerForm } from "./PlayerForm";
import { playersRepository } from "../repositories";

const Stack = createNativeStackNavigator();

type ItemProps = {
  name: string;
  id: number;
  deleteCallback: Function;
  editCallback: Function;
};

const Item = ({ name, id, editCallback, deleteCallback }: ItemProps) => {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{name}</Text>
      </View>
      <View style={styles.icons}>
        <IconButton
          icon="pencil"
          mode="contained-tonal"
          onPress={() => editCallback(id)}
        />
        <IconButton
          icon="delete"
          mode="contained"
          iconColor={theme.colors.error}
          onPress={() => deleteCallback(id)}
        />
      </View>
    </View>
  );
};

const List = ({ navigation }) => {
  const [players, setPlayers] = useState([]);

  const getPlayers = async () => {
    const dbPlayers = await playersRepository.getAll();

    setPlayers(dbPlayers);
  };

  const handleDelete = async (id: number) => {
    await playersRepository.delete(id);
    await getPlayers();
  };

  const handleEdit = (id: number) => {
    navigation.navigate("PlayerForm", { id });
  };

  useFocusEffect(
    useCallback(() => {
      getPlayers();
    }, [])
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.list}>
        <FlatList
          data={players}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              id={item.id}
              deleteCallback={handleDelete}
              editCallback={handleEdit}
            />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center" }}>Aucun joueurs</Text>
          }
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("PlayerForm")}
        variant="primary"
      />
    </View>
  );
};

export const PlayersList = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Players"
        component={List}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayerForm"
        component={PlayerForm}
        options={{ title: "Ajouter un joueur" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  list: {
    marginBottom: 90,
  },
  row: {
    flex: 1,
    backgroundColor: "#FEFEFE",
    paddingHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    flex: 1,
    justifyContent: "center",
  },
  labelText: {
    fontSize: 20,
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
