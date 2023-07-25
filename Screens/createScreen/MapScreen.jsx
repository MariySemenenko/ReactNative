// позначає місцезнаходження користувача на момент завантаження сторінки
// на платформі React Native за допомогою бібліотеки react-native-maps
import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
//MapView - відображення картографічної інформації.
//Marker - поточні координати зі стану
// initialRegion - задає початкові координати та зум для відображення карти
export const MapScreen = () => {
  const [location, setLocation] = useState(null);//створює стан location для зберігання місцезнаходження

  useEffect(() => {//для отримання координат місцезнаходження
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude: "-122,406417",
          latitude: "37,785834",
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
           ...location,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        <Marker coordinate={location} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});