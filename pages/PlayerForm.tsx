import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import db from "../services/database";
import { Player } from "../entities";

const playersRepository = db.getRepository(Player);

export const PlayerForm = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const savePlayer = async () => {
    const sanitizedName = name.trim();
    if (id) {
      await playersRepository.update(id, { name: sanitizedName });
    } else {
      await playersRepository.insert({ name: sanitizedName });
    }
  };

  const handleSubmit = async (navigation) => {
    setIsLoading(true);
    await savePlayer();
    setIsLoading(false);
    navigation.navigate("Players");
  };

  const fetchPlayer = async (id) => {
    setIsLoading(true);
    const dbPlayer = await playersRepository.findOne({ where: { id } });
    if (dbPlayer) {
      setName(dbPlayer.name);
      setId(dbPlayer.id);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.id) {
        fetchPlayer(route.params.id);
      }
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.item}
        label="Nom"
        value={name}
        onChangeText={(name) => setName(name)}
      />
      <Button
        style={styles.item}
        mode="contained"
        onPress={async () => await handleSubmit(navigation)}
      >
        {isLoading ? "Chargement" : "Valider"}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  item: {
    margin: 8,
  },
});
