import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  gameRepository,
  scoreRepository,
  scoreTypeRepository,
} from "../repositories";
import { theme } from "../config/theme";
import { Button } from "react-native-paper";

interface BaseCounterProps {
  route: any;
  type: string;
  title: string;
}

type ItemProps = {
  name: string;
  id: number;
  inputRef: MutableRefObject<{}>;
  setIsReadyToSubmit: Dispatch<SetStateAction<boolean>>;
  playersCount: number;
  playersScore: any[];
  setPlayersScore: Dispatch<SetStateAction<Array<any>>>;
};

const Item = ({
  name,
  id,
  inputRef,
  setIsReadyToSubmit,
  playersScore,
  setPlayersScore,
  playersCount,
}: ItemProps) => {
  const [points, setPoints] = useState("");

  const handlePoint = async (id: number, points: string) => {
    const playersScoreExists = playersScore.some((player) => player.id === id);

    if (playersScoreExists) {
      setPlayersScore(
        playersScore.map((player) => {
          if (player.id === id) {
            return { ...player, points };
          }

          return player;
        })
      );
    } else {
      const newScore = { id, points };
      const newPlayersScore = [...playersScore, newScore];
      setPlayersScore(newPlayersScore);
    }

    setIsReadyToSubmit(
      playersScore.every((player) => player.points) &&
        playersScore.length === playersCount
    );
  };
  return (
    <View style={styles.row}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{name}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={(input) => (inputRef[id] = input)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={2}
          enterKeyHint="next"
          returnKeyType="next"
          onEndEditing={() => {
            if (inputRef[id + 1]) {
              inputRef[id + 1].focus();
            } else {
              inputRef[id].blur();
            }
          }}
          onBlur={() => handlePoint(id, points)}
          onChangeText={(value) => {
            setPoints(value);
          }}
        >
          {points}
        </TextInput>
      </View>
    </View>
  );
};

export const BaseCounter = ({ route, type, title }: BaseCounterProps) => {
  const [players, setPlayers] = useState([]);
  const [playersScore, setPlayersScore] = useState([]);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const inputRef = useRef({});
  const submitRef = useRef();
  const gameId = route.params.gameId;

  const fetchGame = async () => {
    const result = await gameRepository.getOne(gameId);
    setPlayers(result.players);
  };

  const fetchScore = async () => {
    const result = await scoreRepository.findByGameId(gameId);

    const scores = [];

    result.map((score) => {
      const scoreType = score.scoreTypes.find(
        (scoreTypeItem) => scoreTypeItem.type === type
      );

      scores.push({ id: score.player.id, points: scoreType.points });
    });

    setPlayersScore(scores);
  };

  const saveScore = async () => {
    const scoreSheets = await scoreRepository.findByGameId(gameId);

    const scoreTypes = [];

    scoreSheets.map((scoreSheet) => {
      const playerScore = playersScore.find(
        (player) => player.id === scoreSheet.player.id
      );

      if (!playerScore) {
        return null;
      }

      const scoreType = {
        nbCard: 1,
        player: scoreSheet.player.id,
        score: scoreSheet.id,
        type,
        points: playerScore.points,
      };
      scoreTypes.push(scoreType);
    });

    await scoreTypeRepository.insert(scoreTypes);

    debugger;
  };

  useFocusEffect(
    useCallback(() => {
      fetchGame();
      fetchScore();
    }, [])
  );

  return (
    <SafeAreaView>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={players}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            id={item.id}
            inputRef={inputRef}
            setIsReadyToSubmit={setIsReadyToSubmit}
            playersCount={players.length}
            playersScore={playersScore}
            setPlayersScore={setPlayersScore}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>Aucune joueur</Text>
        }
        keyExtractor={(item) => item.id}
      />
      <Button
        ref={submitRef}
        style={styles.button}
        mode="contained"
        onPress={saveScore}
        disabled={!isReadyToSubmit}
      >
        Valider
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    textAlign: "center",
    marginVertical: 20,
  },
  row: {
    flex: 1,
    backgroundColor: "#FEFEFE",
    padding: 10,
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
    fontSize: 24,
  },
  inputContainer: {},
  input: {
    flex: 1,
    width: 60,
    height: 30,
    fontSize: 30,
    textAlign: "center",
    backgroundColor: theme.colors.surfaceDisabled,
  },
  button: {
    marginVertical: 30,
    marginHorizontal: 60,
  },
});
