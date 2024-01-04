import React from "react";
import { Button } from "react-native-paper";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import packageVersion from "../package.json";
import { PlayersList } from "./Players";
import { Games } from "./Games";
import { Settings } from "./Settings";

const Tab = createBottomTabNavigator();

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require("../assets/images/background_7wonders.png")}
      >
        <Image
          style={styles.image}
          source={require("../assets/images/full_shadow_bg_black.png")}
        />
        <Button
          mode="contained"
          uppercase
          onPress={() => {
            navigation.navigate("GameConfig");
          }}
        >
          Nouvelle Partie
        </Button>
        <Text style={{ ...styles.version, color: "#aeaeae" }}>
          {`Version ${packageVersion.version}`}
        </Text>
      </ImageBackground>
    </View>
  );
};

export const Home = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{ tabBarStyle: styles.bar }}
    >
      <Tab.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
        component={HomePage}
      />
      <Tab.Screen
        name="games"
        options={{
          tabBarLabel: "Parties",
          title: "Parties",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="calculate" size={size} color={color} />;
          },
        }}
        component={Games}
      />
      <Tab.Screen
        name="players"
        options={{
          title: "Joueurs",
          tabBarLabel: "Joueurs",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="people" size={size} color={color} />;
          },
        }}
        component={PlayersList}
      />
      <Tab.Screen
        name="settings"
        options={{
          title: "Paramètres",
          tabBarLabel: "Paramètres",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="settings" size={size} color={color} />;
          },
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 100,
    marginBottom: 100,
  },
  version: {
    position: "absolute",
    bottom: 20,
  },
  button: {
    fontSize: 24,
  },
  bar: {
    paddingTop: 4,
    paddingBottom: 8,
  },
});
