//це екран профілю з інформацією та постами які створив користувач
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

import { useSelector, useDispatch } from "react-redux";

import { useAuth } from '../hooks/useAuth';
import { authLogOut } from "../Redax/auth/authOperations";
import { ImageUser } from "../images/ImageUser";

export const ProfileScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const { authState } = useAuth();

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authLogOut());
  };

  const { login, userId } = useSelector((state) => state.auth);


const getDataFromFirestore = async () => {
      const q = query(collection(db, "setPost"), where("userId", "==", userId));

      onSnapshot(q, (data) => {
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
 
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const photoURL = await uploadAvatarToServer(result.assets[0].uri);

      dispatch(removeUserAvatar(photoURL));
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <ImageBackground
      source={require("../images/photo-bg.png")}
      style={styles.imageScreen}
    >
      <View style={styles.containerForm}>
      <View style={styles.infoUserThumb}>
        <View style={styles.containerUser}>
            <ImageUser style={styles.image} state={authState} onPress={pickImageAsync} />
            <Text style={{ fontFamily: 'Inter-Black', fontSize: 30, marginTop: 30}}>{login}</Text>
            </View>
            <TouchableOpacity
              style={{ position: 'absolute', right: 0, marginTop: 22 }}
              onPress={logOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={posts}
          
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
                  <Feather
                   name="log-out" 
                   size={24} 
                   color="#BDBDBD" 
                   onPress={logOut}
                  //  style={{marginBottom: 100}}
                  style={styles.logAut}
                   />
                </View>
                <Text style={[{ ...styles.text, ...styles.namePost }]}>
                  {namePost}
                </Text>
                <View style={styles.infoThumb}>
                  <TouchableOpacity
                    style={styles.info}
                    onPress={() => navigation.navigate("Коментарі", 
                  { postId: id, photo})}
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
                    onPress={() => navigation.navigate("Карта", {
                      photo,
                      namePost,
                      location,
                    })}
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
          keyExtractor={(item) => item.id}
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
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: 'center',
  },
  
  infoUserThumb: {
    flex: 1,
    width: '100%',
    alignItems: "center",
  },
  containerUser: {
    position: 'absolute',
    transform: [{ translateX: 10 }, { translateY: -60 }], 
  }
});