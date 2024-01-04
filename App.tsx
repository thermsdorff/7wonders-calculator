import "reflect-metadata";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "./config/theme";
import db from "./services/database";
import { Home } from "./pages/Homepage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GameConfig } from "./pages/GameConfig";
import { GameCounter } from "./pages/GameCounter";

LogBox.ignoreLogs(["Require cycle:", "`new NativeEventEmitter()`"]);

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const initDB = async () => {
      try {
        await db.initialize();
      } catch (e) {
        console.log(e);
      }
    };

    initDB();
  });

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GameConfig"
              component={GameConfig}
              options={{ title: "Configuration de la partie" }}
            />
            <Stack.Screen
              name="GameCounter"
              component={GameCounter}
              options={{ title: "Compeur de partie" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
