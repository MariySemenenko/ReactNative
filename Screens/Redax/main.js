import { StyleSheet } from "react-native";
import { Router } from "../router";

import { NavigationContainer } from "@react-navigation/native";
import { authStateChanged } from "../Redax/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Main() {

  const {stateChange} = useSelector((state) => state.auth);
  //console.log('stateChange', stateChange)
   const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authStateChanged())
    }, [])
  

  const routing = Router(stateChange);
 // const routing = Router()
  return (

    <NavigationContainer style={styles.container}>
      {routing}
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});