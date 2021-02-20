import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "ultis/routes";
import TabSearchEvents from "screens/TabSearchEvents";
import headerBackground from "components/header/headerbackground";
import CreateGroup from "screens/Group/CreateGroup";
import NotificationRightHeader from "components/NotificationRightHeader";
const Stack = createStackNavigator();
const StackSearchEvents = memo(() => (
  <Stack.Navigator
    screenOptions={{
      headerBackground: headerBackground,
      headerTintColor: "#FFF",
      headerRight: () => <NotificationRightHeader />,
    }}
  >
    <Stack.Screen
      name={ROUTES.StackSearchEvents}
      component={TabSearchEvents}
      options={{
        title: "Groups",
      }}
    />
    <Stack.Screen
      name={ROUTES.CreateGroup}
      component={CreateGroup}
      options={{
        title: "Create Group",
      }}
    />
  </Stack.Navigator>
));

export default StackSearchEvents;
