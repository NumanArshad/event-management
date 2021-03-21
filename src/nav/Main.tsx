import React, { memo, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./StackNavigators/AuthNavigator";
import PrivateNavigator from "./StackNavigators/PrivateNavigator";
import { Alert, StatusBar } from "react-native";
import { getUserSessions } from "redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosition, watchUserGeoLocation } from "ultis/functions";
import { getAuthUserObserver } from "redux/users/users.actions";
import { alertMessage } from "ultis/alertToastMessages";

const Main = memo(() => {

  const dispatch = useDispatch();
  const { is_authenticated } = useSelector<any, any>((state) => state.auth);

  useEffect(() => {
   (async() => (is_authenticated ? await getUserPosition() : dispatch(getUserSessions())))();
    is_authenticated && dispatch(getAuthUserObserver());

   // alertMessage("conditional iff"+is_authenticated)
  }, [dispatch, is_authenticated]);



  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={"transparent"}
      />
      {/* {GetItem_AsynsStorage("Token").then((res) => //console.log("ASYNC", res))} */}
      {is_authenticated ? <PrivateNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
});

export default Main;
