import React, { memo } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ROUTES from "ultis/routes";
import ProfileActivity from "screens/ProfileActivity";
import ProfileTickets from "screens/ProfileTickets";
import ProfileSaved from "screens/ProfileSaved";
import About from "screens/About";
import Donation from "screens/Donation/Donation";
import Color from "ultis/color";

const Tab = createMaterialTopTabNavigator();

const TabProfile = memo(() => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Color.GRAD_COLOR_3,
        inactiveTintColor: "#7F8FA6",
        indicatorStyle: {
          backgroundColor: Color.GRAD_COLOR_3,
        },
      }}
    >
      <Tab.Screen name={ROUTES.About} component={About} />
      <Tab.Screen name={ROUTES.AccountSetting} component={ProfileActivity} />
      <Tab.Screen name={ROUTES.EventList} component={ProfileSaved} />
      <Tab.Screen name={ROUTES.Payout} component={Donation} />
    </Tab.Navigator>
  );
});

export default TabProfile;
