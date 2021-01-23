import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "ultis/routes";
import Login from "screens/Auth/Login";
import headerBackground from "components/header/headerbackground";
import Register from "screens/Auth/Register";
import ForgotPassword from "screens/Auth/ForgotPassword";
import ChangePassword from "screens/Auth/ChangePassword";
import PeopleProfile from "screens/PeopleProfile";
import Profile from "screens/Auth/Profile";

const authStack = createStackNavigator();

const AuthNavigator = () => (
  <authStack.Navigator
    screenOptions={{
      headerBackground: headerBackground,
      headerTintColor: "#FFF",
    }}
  >
    <authStack.Screen name={ROUTES.Login} component={Login} />
    <authStack.Screen name={ROUTES.Register} component={Register} />
    <authStack.Screen name={ROUTES.ForgotPassword} component={ForgotPassword} />
    <authStack.Screen name={ROUTES.ChangePassword} component={ChangePassword} />
    {/* <authStack.Screen name={ROUTES.Profile} component={Profile} /> */}
  </authStack.Navigator>
);
export default AuthNavigator;
