import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Home } from "./pages/Homepage";
import { PlayersList } from "./pages/Players";
import { theme } from "./config/theme";
import { Settings } from "./pages/Settings";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => (
  <PaperProvider theme={theme}>
    <NavigationContainer>
      {/* <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
      name="Home"
      component={Home}
          options={{ headerShown: false }}
          />
          <Stack.Screen
          name="Players"
          component={PlayersList}
          options={{ title: "Liste des joueurs" }}
          />
          <Stack.Screen
          name="PlayerForm"
          component={PlayerForm}
          options={{ title: "Ajouter un joueur" }}
        />
      </Stack.Navigator>
    </NavigationContainer> */}
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
          component={Home}
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
    </NavigationContainer>
  </PaperProvider>
);

const styles = StyleSheet.create({
  bar: {
    paddingTop: 4,
    paddingBottom: 8,
  },
});

export default App;
