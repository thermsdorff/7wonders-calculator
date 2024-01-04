import { useCallback, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { gameRepository } from "../repositories";
import { Player } from "../entities";

export const Games = ({ navigation }) => {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    const result = await gameRepository.getAll();

    console.log(result);
    setGames(result);
  };

  const handleDelete = async (id: number) => {
    await gameRepository.delete(id);
    setGames(games.filter((game) => game.id !== id));
  };

  useFocusEffect(
    useCallback(() => {
      fetchGames();
    }, [])
  );

  type ItemProps = {
    name: string;
    players: Player[];
    createdAt: Date;
    id: number;
    deleteCallback: Function;
  };

  const Item = ({
    name,
    players,
    createdAt,
    id,
    deleteCallback,
  }: ItemProps) => {
    const theme = useTheme();

    return (
      <View style={styles.row}>
        <TouchableHighlight
          onPress={() => navigation.navigate("GameCounter", { id })}
        >
          <View style={styles.label}>
            <Text style={styles.labelText}>
              {name} ({players.length}/7)
            </Text>
            <Text style={styles.dateText}>
              {`${createdAt.toLocaleDateString(
                "FR-fr"
              )} ${createdAt.toLocaleTimeString("FR-fr")}`}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.icons}>
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

  return (
    <SafeAreaView>
      <FlatList
        data={games}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            id={item.id}
            players={item.players}
            createdAt={item.createdAt}
            deleteCallback={handleDelete}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>Aucune partie</Text>
        }
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  dateText: {
    color: "#afafaf",
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
