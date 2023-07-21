import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from './RegistrationScreen';
import { LoginScreen } from './LoginScreen';


const MainStack = createStackNavigator();

export const Navigation = () => {


  
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen  name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        {/* <MainStack.Screen
          name="Home"
          component={Home}
          options={{ title: "Start screen" }}
        /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
