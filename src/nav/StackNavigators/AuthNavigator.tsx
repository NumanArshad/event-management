import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "ultis/routes";
import Login from "screens/Auth/Login";

const authStack = createStackNavigator();

const AuthNavigator = () => (
  <authStack.Navigator>
    <authStack.Screen name={ROUTES.Login} component={Login} />
  </authStack.Navigator>
);
export default AuthNavigator;
