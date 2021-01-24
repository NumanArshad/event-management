import React, { memo } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ROUTES from "ultis/routes";
import ProfileActivity from "screens/ProfileActivity";
import ProfileTickets from "screens/ProfileTickets";
import ProfileSaved from "screens/ProfileSaved";
import About from "screens/About";

const Tab = createMaterialTopTabNavigator();

const TabProfile = memo(() => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#ED3269",
        inactiveTintColor: "#7F8FA6",
        indicatorStyle: {
          backgroundColor: "#ED3269",
        },
      }}
    >
      <Tab.Screen name={ROUTES.About} component={About} />
      <Tab.Screen name={ROUTES.AccountSetting} component={ProfileActivity} />
      <Tab.Screen name={ROUTES.EventList} component={ProfileSaved} />
      <Tab.Screen name={ROUTES.Payout} component={ProfileTickets} />
    </Tab.Navigator>
  );
});

export default TabProfile;
