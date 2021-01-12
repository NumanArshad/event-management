import React, { memo, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./StackNavigators/AuthNavigator";
import PrivateNavigator from "./StackNavigators/PrivateNavigator";
import { StatusBar } from "react-native";

const Main = memo(() => {
  const [isAuthenticated, setAutenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAutenticated(true);
    }, 10000);
  }, []);
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={"transparent"}
      />
      {!isAuthenticated ? <AuthNavigator /> : <PrivateNavigator />}
    </NavigationContainer>
  );
});

export default Main;
