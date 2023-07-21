import {
  StyleSheet,
  KeyboardAvoidingView, //вирівнює контент, щоб уникнути перекриття клавіатурою
  Text,
  View,
  ImageBackground, //зображення фону
  Image,
  TextInput,
  TouchableOpacity, //Показати/Приховати пароль
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";

const initialState = {
  //створюю стартовий стан
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true); //створюю стани useState
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [state, setState] = useState(initialState);
  const [displayText, setDisplaytext] = useState("Показати");

  const keybordHide = () => {
    //При натисканні кнопки "Зареєструватися"
    setIsShowKeybord(false);
    Keyboard.dismiss(); //закриваю клавіатуру
    console.log(state); //виводю стейт в консоль
    navigation.navigate("Home"); //переходю на екран Home
    setState(initialState); //зберігаю початковий стан
  };

  useEffect(() => {
    //для визначення тексту паролю
    setDisplaytext(showPassword ? "Показати" : "Приховати");
  }, [displayText, showPassword]);

  const handleTogglePassword = () => {
    // викликається при натисканні на кнопку Показати/Приховати пароль
    setShowPassword(!showPassword); //і змінює значення кнопки
  };

  return (
    <ImageBackground
      source={require("./images/photo-bg.png")}
      style={styles.imageScreen}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.containerKey}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -165 : -165}
        >
          <View style={styles.containerForm}>
            <Image
              style={styles.image}
              source={require("./images/rectangle.png")}
            />
            <Text style={styles.text}>Реєстрація</Text>

            <TextInput
              style={styles.input}
              placeholder={"Логін"}
              value={state.login}
              onChangeText={(
                value //зберігаю в state та оновлюю стан тексту login
              ) => setState((prevState) => ({ ...prevState, login: value }))}
              onFocus={() => setIsShowKeybord(true)}
            />
            <TextInput
              style={styles.input}
              placeholder={"Адреса електронної пошти"}
              value={state.email}
              onChangeText={(
                value //зберігаю в state та оновлюю стан тексту email
              ) => setState((prevState) => ({ ...prevState, email: value }))}
              onFocus={() => setIsShowKeybord(true)}
            />

            <View>
              <TextInput
                style={styles.input}
                placeholder={"Пароль"}
                value={state.password}
                onChangeText={(
                  value //зберігаю в state та оновлюю стан тексту password
                ) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                onFocus={() => setIsShowKeybord(true)}
                secureTextEntry={showPassword}
              />
              <TouchableOpacity
                style={styles.passwordShow}
                onPress={handleTogglePassword}
              >
                <Text>{displayText}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btn} onPress={keybordHide}>
              <Text style={styles.textBtn}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.textLogin}>Вже є акаунт?</Text>
              <Text style={styles.textLogin}>Увійти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageScreen: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  containerKey: {
    flex: 1,
    justifyContent: "flex-end",
  },

  containerForm: {
    paddingTop: 92,
    paddingBottom: 78,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  input: {
    padding: 16,
    marginTop: 18,
    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    width: 343,
    height: 50,
    borderRadius: 10,
  },
  text: {
    marginBottom: 25,
    fontWeight: 500,
    fontSize: 30,
    marginTop: 20,
    lineHeight: 35,
  },
  btn: {
    marginTop: 50,
    marginBottom: 16,
    width: 343,
    height: 51,
    borderRadius: 100,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FF6C00",
    alignItems: "center",
  },
  textBtn: {
    color: "#FFFFFF",
  },
  image: {
    width: 132,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  textLogin: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 19,
  },
  passwordShow: {
    position: "absolute",
    top: 15,
    right: 65,
    transform: [{ translateX: 50 }, { translateY: 17 }],
  },
});

//При натисканні кнопки "Зареєструватися" виконується функція keybordHide,
// яка закриває клавіатуру, виводить поточний стан state і переходить на екран "Home".
//Компонент має кнопку "Увійти", яка при натисканні переходить на екран "LoginScreen"
// за допомогою navigation.navigate().
