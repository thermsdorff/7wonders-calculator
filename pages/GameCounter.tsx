import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { gameRepository } from "../repositories";
import { Game } from "../entities/Game";
import {
  WonderCounter,
  MoneyCounter,
  MilitaryCounter,
  CivilCounter,
  MarketCounter,
  ScientistCounter,
  GuildCounter,
  CitiesCounter,
  BattleshipCounter,
  LeadersCounter,
  IslandsCounter,
} from "../components";

const Tab = createMaterialTopTabNavigator();

export const GameCounter = ({ route }) => {
  const gameId = route.params?.id || null;
  const [hasCities, setHasCities] = useState(false);
  const [hasLeaders, setHasLeaders] = useState(false);
  const [hasArmada, setHasArmada] = useState(false);

  if (!gameId) {
    return <Text>Impossible de charger la partie</Text>;
  }

  const initialGame = new Game();
  initialGame.players = [];
  initialGame.extensions = [];

  const [game, setGame] = useState(initialGame);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGame = async () => {
    const result = await gameRepository.getOne(gameId);
    setGame(result);

    result.extensions.map(({ name }) => {
      switch (name) {
        case "Cities":
          setHasCities(true);
          break;
        case "Leaders":
          setHasLeaders(true);
          break;
        case "Armada":
          setHasArmada(true);
          break;
        default:
          break;
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGame();
  }, []);

  return isLoading ? (
    <Text>Chargement</Text>
  ) : (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          margin: 0,
          padding: 0,
          width: 100,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Wonder"
        component={WonderCounter}
        initialParams={{ gameId: game.id }}
        options={{
          title: "Merveilles",
          tabBarLabelStyle: {
            ...styles.defaultLabelStyle,
            backgroundColor: "grey",
          },
        }}
      />
      <Tab.Screen
        name="Money"
        component={MoneyCounter}
        initialParams={{ gameId: game.id }}
        options={{
          title: "Argent",
          tabBarLabelStyle: {
            ...styles.defaultLabelStyle,
            backgroundColor: "orange",
          },
        }}
      />
      <Tab.Screen
        name="Military"
        component={MilitaryCounter}
        initialParams={{ gameId: game.id }}
        options={{
          title: "Militaire",
          tabBarLabelStyle: {
            ...styles.defaultLabelStyle,
            backgroundColor: "#D9212C",
          },
        }}
      />
      <Tab.Screen
        name="Civil"
        component={CivilCounter}
        initialParams={{ gameId: game.id }}
        options={{
          title: "Civil",
          tabBarLabelStyle: {
            ...styles.defaultLabelStyle,
            backgroundColor: "#0097D4",
          },
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketCounter}
        initialParams={{ gameId: game.id }}
        options={{
          title: "Marché",
          tabBarLabelStyle: {
            ...styles.defaultLabelStyle,
            backgroundColor: "#FBAF17",
          },
        }}
      />
      <Tab.Screen
        name="Scientist"
        component={ScientistCounter}
        initialParams={{ gameId: game.id }}
        options={{
          title: "Scientifique",
          tabBarLabelStyle: {
            ...styles.defaultLabelStyle,
            backgroundColor: "#52A651",
          },
        }}
      />
      <Tab.Screen
        name="Guild"
        component={GuildCounter}
        initialParams={{ gameId: game.id }}
        options={{
          title: "Guilde",
          tabBarLabelStyle: {
            ...styles.defaultLabelStyle,
            backgroundColor: "#7067BB",
          },
        }}
      />
      {hasCities ? (
        <Tab.Screen
          name="Cities"
          component={CitiesCounter}
          initialParams={{ gameId: game.id }}
          options={{
            title: "Cities",
            tabBarLabelStyle: {
              ...styles.defaultLabelStyle,
              backgroundColor: "#111",
            },
          }}
        />
      ) : (
        <></>
      )}
      {hasLeaders ? (
        <Tab.Screen
          name="Leaders"
          component={LeadersCounter}
          initialParams={{ gameId: game.id }}
          options={{
            title: "Leaders",
            tabBarLabelStyle: {
              ...styles.defaultLabelStyle,
              backgroundColor: "grey",
            },
          }}
        />
      ) : (
        <></>
      )}
      {hasArmada ? (
        <Tab.Screen
          name="Battleship"
          component={BattleshipCounter}
          initialParams={{ gameId: game.id }}
          options={{
            title: "Naval",
            tabBarLabelStyle: {
              ...styles.defaultLabelStyle,
              backgroundColor: "#3576A8",
            },
          }}
        />
      ) : (
        <></>
      )}
      {hasArmada ? (
        <Tab.Screen
          name="Islands"
          component={IslandsCounter}
          initialParams={{ gameId: game.id }}
          options={{
            title: "Iles",
            tabBarLabelStyle: {
              ...styles.defaultLabelStyle,
              backgroundColor: "#50AAE1",
            },
          }}
        />
      ) : (
        <></>
      )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  defaultLabelStyle: {
    margin: 0,
    padding: 0,
    flex: 1,
    width: 100,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 85,
    color: "#fff",
  },
});
