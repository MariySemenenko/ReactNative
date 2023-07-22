import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
 import { Feather } from "@expo/vector-icons";

export const ProfileScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);

  return (
    <ImageBackground
      source={require("../image/photoApp.png")}
      style={styles.imageScreen}
    >
      <View style={styles.containerForm}>
        <Image style={styles.image} source={require("../image/AddPhoto.png")} />
      </View>

      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({
            item: {
              id,
              photo,
              namePost,
              location,
              convertedCoordinate,
              commentsCount,
            },
          }) => {
            return (
              <View style={styles.subContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: photo }} style={styles.image} />
                </View>
                <Text style={[{ ...styles.text, ...styles.namePost }]}>
                  {namePost}
                </Text>
                <View style={styles.infoThumb}>
                  <TouchableOpacity
                    style={styles.info}
                    onPress={() => navigation.navigate("Коментарі")}
                  >
                    <Feather
                      name="message-circle"
                      size={24}
                      color="#BDBDBD"
                      style={[
                        { transform: [{ rotate: "-90deg" }] },
                        commentsCount
                          ? { color: "#FF6C00" }
                          : { color: "#BDBDBD" },
                      ]}
                    />
                    <Text
                      style={[
                        styles.textComment,
                        commentsCount
                          ? { color: "#212121" }
                          : { color: "#BDBDBD" },
                      ]}
                    >
                      {commentsCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.info}
                    onPress={() => navigation.navigate("Карта")}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={[{ ...styles.text, ...styles.locationText }]}>
                      {convertedCoordinate}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageScreen: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  containerForm: {
    flex: 1,
    top: 200,
    paddingTop: 92,
    paddingBottom: 78,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  image: {
    width: 132,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
});