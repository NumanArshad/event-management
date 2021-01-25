import React, { memo, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./StackNavigators/AuthNavigator";
import PrivateNavigator from "./StackNavigators/PrivateNavigator";
import { Alert, StatusBar } from "react-native";
import { getUserSessions } from "redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";

const Main = memo(() => {
  const [isAuthenticated, setAutenticated] = useState(false);

  const dispatch = useDispatch();
  const { is_authenticated } = useSelector<any, any>((state) => state.auth);

  useEffect(() => {
    dispatch(getUserSessions());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={"transparent"}
      />
      {/* {GetItem_AsynsStorage("Token").then((res) => console.log("ASYNC", res))} */}
      {is_authenticated ? <PrivateNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
});

export default Main;
