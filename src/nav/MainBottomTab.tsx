import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "ultis/routes";
import SvgTabPlanInactive from "svgs/MainBottomTab/SvgTapPlanInactive";
import SvgTabSearchInactive from "svgs/MainBottomTab/SvgTabSearchInactive";
import SvgTabEvezInactive from "svgs/MainBottomTab/SvgTabEvezInactive";
import SvgTabPeopleInactive from "svgs/MainBottomTab/SvgTabPeopleInactive";
import SvgTabProfileInactive from "svgs/MainBottomTab/SvgTabProfileInactive";
import EvezForUStack from "nav/EvezForUStack";
import StackPeople from "nav/StackPeople";
import StackSearchEvents from "nav/StackSearchEvents";
import EvezNews from "screens/EvezNews";
import StackProfile from "nav/StackProfile";
import StackCalender from "./StackCalender";

const Tab = createBottomTabNavigator();

const MainBottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#ED3269",
        inactiveTintColor: "#353B48",
      }}
    >
      <Tab.Screen
        name={ROUTES.TabPlan}
        component={EvezForUStack}
        options={{
          tabBarIcon: ({ color }) => <SvgTabPlanInactive color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.TabSearchEvents}
        component={StackSearchEvents}
        options={{
          tabBarIcon: ({ color }) => <SvgTabSearchInactive color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.EvezNews}
        component={StackCalender}
        options={{
          tabBarIcon: ({ color }) => <SvgTabEvezInactive color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.TabPeople}
        component={StackPeople}
        options={{
          tabBarIcon: ({ color }) => <SvgTabPeopleInactive color={color} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.TabProfile}
        component={StackProfile}
        options={{
          tabBarIcon: ({ color }) => <SvgTabProfileInactive color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default MainBottomTab;
