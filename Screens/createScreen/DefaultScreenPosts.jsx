// відображає список постів у вигляді карток та можна перейти на Коментарі та Карта для кожного посту
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,//для відображення списку постів у вигляді карток
  Image,
  TouchableOpacity,//дозволяє створити кнопку
} from "react-native";
import React from "react";
//import { Feather } from "@expo/vector-icons";

export const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);// створює стан posts, який зберігає список постів

  useEffect(() => {//для оновлення списку постів з допомогою параметрів маршруту (route.params)
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}//список постів які потрібно відобразити
        keyExtractor={(item) => item.id}
        renderItem={({//вигляд окремих елементів списку постів
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
                  onPress={() => navigation.navigate("Коментарі")}//для переходу на Коментарі
                >
                  {/* <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={[
                      { transform: [{ rotate: "-90deg" }] },
                      commentsCount
                        ? { color: "#FF6C00" }
                        : { color: "#BDBDBD" },
                    ]}
                  /> */}
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
                  onPress={() => navigation.navigate("Карта")}//для переходу на Карта
                >
                  {/* <Feather name="map-pin" size={24} color="#BDBDBD" /> */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: "100%",
    backgroundColor: "#ffffff",
  },
  subContainer: {
    marginBottom: 32,
  },
  text: {
    fontSize: 16,
    color: "#212121",
  },
  image: {
    height: 240,
    borderRadius: 8,
  },
  namePost: {
    marginVertical: 8,
    // fontFamily: "Inter-Black",
  },
  infoThumb: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});