import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nestedScreen/DefaultScreenPosts";
import { MapScreen } from "../nestedScreen/MapScreen";
import { CommentsScreen } from "../nestedScreen/CommentsScreen";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

export const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="Публікації" component={DefaultScreenPosts} />
      <NestedScreen.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: 16, marginBottom: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
          ),
        }}
        name="Карта"
        component={MapScreen}
      />
      <NestedScreen.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: 16, marginBottom: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
          ),
        }}
        name="Коментарі"
        component={CommentsScreen}
      />
    </NestedScreen.Navigator>
  );
};
