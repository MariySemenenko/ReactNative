//Цей код відповідає за екран створення постів для додавання фотографій та інформації перед публікацією.
//import { collection, addDoc } from "firebase/firestore"; 
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useSelector } from "react-redux";
import { db } from "../Redax/config";
import { collection, addDoc  } from "firebase/firestore";

export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [convertedCoordinate, setConvertedCoordinate] = useState(null);
  const [namePost, setNamePost] = useState("");
  const [hasPermission, setHasPermission] = useState(null);

  const {userId, login} = useSelector(state => state.auth);
  console.log(userId, login)

  const createSetPost = async () => {
// Add a new document with a generated id.
await addDoc(collection(db, "setPost"), {
  userId,
  login,
  photo,
  location,
   namePost,
  convertedCoordinate,
});
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = async () => {
    navigation.navigate("Публікації", {
      photo,
      location,
      namePost,
      convertedCoordinate,
    });
    createSetPost();
    setPhoto(null);
    setLocation(null);
    setNamePost("");
    setConvertedCoordinate(null);
  };

  const openGallery = async () => {
    const galleryResult = await ImagePicker.launchImageLibraryAsync();

    if (!galleryResult.canceled && galleryResult.assets.length > 0) {
      setPhoto(galleryResult.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const { region, country } = address[0];

      setConvertedCoordinate({ region, country });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: 100, width: 100 }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
            <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
        <TouchableOpacity onPress={openGallery}>
          <Text style={styles.text}>
            {photo ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            value={namePost.trimStart()}
            onChangeText={setNamePost}
          />
          <TextInput
            style={{ ...styles.input, marginTop: 16 }}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            value={convertedCoordinate}
            onChangeText={setConvertedCoordinate}
          />
          <TouchableOpacity
            style={[
              !photo || !namePost || !convertedCoordinate
                ? styles.button
                : styles.activeButton,
            ]}
            disabled={!photo || !namePost || !convertedCoordinate}
            onPress={sendPhoto}
          >
            <Text
              style={[
                !photo || !namePost || !convertedCoordinate
                  ? styles.buttonTitle
                  : styles.activeButtonTitle,
              ]}
            >
              {" "}
              Опублікувати
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            marginBottom: 34,
          }}
        >
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => {
              setPhoto(null);
              setNamePost("");
              setConvertedCoordinate(null);
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  camera: {
    position: "relative",
    marginTop: 32,
    borderRadius: 8,
    overflow: "hidden",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  snapContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#FFFFFF4D",
  },
  takePhotoContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 1,
  },
  inputContainer: {
    marginTop: 32,
  },
  input: {
    gap: 16,
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 15,
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    color: "#212121",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 32,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
  },
  activeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 32,
    borderRadius: 100,

    backgroundColor: "#FF6C00",
  },
  buttonTitle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter-Black",
    lineHeight: 19,
    color: "#BDBDBD",
  },
  activeButtonTitle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter-Black",
    lineHeight: 19,
    color: "#FFFFFF",
  },
  text: {
    marginTop: 8,
    fontFamily: "Inter-Black",
    fontSize: 16,
    color: "#BDBDBD",
  },
  previewImage: {
    height: 240,
    borderRadius: 8,
  },
  buttonDelete: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});