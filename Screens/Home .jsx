
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ProfileScreen } from "./createScreen/ProfileScreen";
import { CreatePostsScreen } from "./createScreen/CreatePostsScreen";
import { DefaultScreenPosts } from "./createScreen/DefaultScreenPosts";

const Tabs = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const [tabBarStyle, setTabBarStyle] = useState("flex");

  return (
    <Tabs.Navigator
      screenOptions={{
        headerTitleAlign: "center",

        headerStyle: {
          borderBottomWidth: 1,
          borderColor: "#E5E5E5",
        },

        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#212121",

        tabBarStyle: {
          display: tabBarStyle,
          height: 83,
          paddingTop: 5,
          paddingBottom: 34,
          paddingHorizontal: 90,
          borderTopWidth: 1,
          borderColor: "#E5E5E5",
        },

        tabBarItemStyle: {
          borderRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16, marginBottom: 10 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
        name="Публікації"
        component={DefaultScreenPosts}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <Tabs.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16, marginBottom: 10 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        name="Профіль"
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};