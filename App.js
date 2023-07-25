import "react-native-gesture-handler";
import React from "react";
//import { Navigation } from "./Screens/navigatoin";

import { Provider } from "react-redux";
import { store } from "./Screens/Redax/store";


import Main from "./Screens/Redax/main";


export default function App() {
  return (
    
     <Provider store={store}> 
      <Main />
     
      </Provider>
    
  );
}