import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "./LoginScreen";
import { RegistrationScreen } from "./RegistrationScreen";
import { Home } from "./Home ";
import { MapScreen } from "./createScreen/MapScreen";
import { CommentsScreen } from "./createScreen/CommentsScreen";


const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
//const DefaultStack = createStackNavigator();

export const Router = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
       
      </MainStack.Navigator>
    );
  }
  return (
    <HomeStack.Navigator>
    <HomeStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <HomeStack.Screen name="Map" component={MapScreen} />
        <HomeStack.Screen name="Coment" component={CommentsScreen} />
        </HomeStack.Navigator>
  );
};