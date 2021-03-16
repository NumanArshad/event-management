import React, { memo } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ROUTES from "ultis/routes";
import EventAroundYou from "screens/EventAroundYou";
import EvezTrending from "screens/EvezTrending";
import FONTS from "ultis/fonts";
import Color from "ultis/color";
import MyGroups from "screens/Group/MyGroups";
import OtherGroups from "screens/Group/OtherGroups";

const Tab = createMaterialTopTabNavigator();
const GroupTab = memo(() => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Color.GRAD_COLOR_3,
        inactiveTintColor: "#7F8FA6",
        indicatorStyle: {
          backgroundColor: Color.GRAD_COLOR_3,
        },
        labelStyle: {
          fontFamily: FONTS.Regular,
        },
      }}
    >
      <Tab.Screen
        name={"my_groups"}
        component={MyGroups}
        options={{
          tabBarLabel: "My Groups",
        }}
      />
      <Tab.Screen
        name={"other_groups"}
        component={OtherGroups}
        options={{
          tabBarLabel: "Other Groups",
        }}
      />
    </Tab.Navigator>
  );
});
export default GroupTab;
