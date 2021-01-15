import React, { memo, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./StackNavigators/AuthNavigator";
import PrivateNavigator from "./StackNavigators/PrivateNavigator";
import { Alert, StatusBar } from "react-native";
import { GetItem_AsynsStorage } from "redux/auth/auth.actions";

const Main = memo(() => {
  const [isAuthenticated, setAutenticated] = useState(false);

  useEffect(() => {
    GetItem_AsynsStorage("Token").then((res) => {
      console.log("RESPONSE TOKEN", res);
      if (res === null) {
        setAutenticated(false);
      } else {
        setAutenticated(true);
      }
      Alert.alert("respnw" + res);
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={"transparent"}
      />
      {/* {GetItem_AsynsStorage("Token").then((res) => console.log("ASYNC", res))} */}
      {isAuthenticated ? <PrivateNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
});

export default Main;
