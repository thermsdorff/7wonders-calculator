import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  extensionsRepository,
  gameRepository,
  playersRepository,
} from "../repositories";
import {
  Button,
  IconButton,
  Portal,
  Snackbar,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Game, Score } from "../entities";

export const GameConfig = ({ navigation }) => {
  const theme = useTheme();
  const [extensions, setExtensions] = useState([]);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openSnackbar = () => setVisible(true);
  const closeSnackbar = () => setVisible(false);

  const fetchPlayers = async () => {
    const dbPlayers = await playersRepository.getAll();

    setPlayers(
      dbPlayers.map((player) => {
        return { ...player, selected: false };
      })
    );
  };

  const updateSelectedPlayer = (id: number, isSelected: boolean) => {
    if (playerCount >= 7 && isSelected) {
      openSnackbar();
      return;
    }

    setPlayers(
      players.map((player) => {
        if (player.id === id) {
          return { ...player, selected: isSelected };
        }
        return player;
      })
    );
  };

  const fetchExtensions = async () => {
    const result = await extensionsRepository.getActivated();
    setExtensions(
      result.map((row) => {
        return {
          ...row,
          selected: false,
        };
      })
    );
  };

  const updateSelectedExtension = (id: number, isSelected: boolean) => {
    setExtensions(
      extensions.map((extension) => {
        if (extension.id === id) {
          return { ...extension, selected: isSelected };
        }
        return extension;
      })
    );
  };

  const handleStart = async (navigation) => {
    try {
      const newGame = new Game();
      newGame.extensions = [];
      extensions
        .filter((extension) => extension.selected === true)
        .map((extension) => {
          newGame.extensions.push(extension);
        });

      newGame.players = [];
      newGame.scores = [];
      players
        .filter((player) => player.selected === true)
        .map((player) => {
          newGame.players.push(player);
          const scoreSheet = new Score();
          scoreSheet.player = player;
          newGame.scores.push(scoreSheet);
        });

      newGame.name = name;

      console.log("newGame", newGame);
      console.table("extensions", newGame.extensions);
      console.table("players", newGame.players);
      console.table("score", newGame.scores);

      setIsLoading(true);
      const gameCreated = await gameRepository.create(newGame);
      navigation.navigate("GameCounter", { id: gameCreated.id });
    } catch (e) {
      console.log(e);
    }
  };

  const icons = {
    Cities: "knife",
    Leaders: "face-man",
    Armada: "sail-boat",
  };

  useEffect(() => {
    fetchExtensions();
    fetchPlayers();
  }, []);

  useEffect(() => {
    const selectedPlayers = players.filter(
      (player) => player.selected === true
    );
    setPlayerCount(selectedPlayers.length);
  }, [players]);

  type ItemProps = {
    name: string;
    id: number;
    selected?: false;
  };

  const Item = ({ name, id, selected }: ItemProps) => {
    const theme = useTheme();

    return (
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>{name}</Text>
        </View>
        <View style={styles.icons}>
          <IconButton
            icon="check"
            mode="contained"
            selected={selected}
            iconColor={
              selected ? theme.colors.surface : theme.colors.surfaceDisabled
            }
            onPress={() => {
              updateSelectedPlayer(id, !selected);
            }}
          />
        </View>
      </View>
    );
  };

  const extensionItems = extensions.map((extension) => (
    <IconButton
      key={extension.id}
      icon={icons[extension.name]}
      iconColor={
        extension.selected ? theme.colors.surface : theme.colors.surfaceDisabled
      }
      size={40}
      mode="contained"
      selected={extension.selected}
      onPress={() => {
        updateSelectedExtension(extension.id, !extension.selected);
      }}
    />
  ));

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Snackbar
          style={styles.snackbar}
          visible={visible}
          onDismiss={closeSnackbar}
        >
          Maximum de joueurs atteint
        </Snackbar>
      </Portal>
      <View style={styles.subContainer}>
        <TextInput
          style={styles.input}
          label="Nom de la partie"
          value={name}
          onChangeText={(value) => {
            setName(value);
          }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Extensions</Text>

        {extensionItems.length > 0 ? (
          <View style={styles.iconContainer}>{extensionItems}</View>
        ) : (
          <Text style={{ textAlign: "center", marginVertical: 40 }}>
            Aucune extension disponible
          </Text>
        )}
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Joueurs ({playerCount}/7)</Text>
      </View>
      <View style={styles.playersList}>
        <FlatList
          data={players}
          renderItem={({ item }) => (
            <Item name={item.name} id={item.id} selected={item.selected} />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center" }}>Aucun joueurs</Text>
          }
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          uppercase
          onPress={() => {
            handleStart(navigation);
          }}
        >
          {isLoading ? "Chargement..." : "Commencer"}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  subContainer: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  snackbar: {
    backgroundColor: "rgb(186, 26, 26)",
  },
  input: {
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginVertical: 20,
  },
  playersList: {
    height: 300,
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
});
