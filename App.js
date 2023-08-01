import React from "react";
// import { useFonts } from "expo-font";
// import { Text } from "react-native";
// import { NavigationApp } from "./src/Screens/navigation/NavigationApp";

import { Provider } from "react-redux";
import { store } from "./Screens/Redax/store";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import Main from "./Screens/Redax/main";



export default function App() {
    const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Roboto-Light.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}