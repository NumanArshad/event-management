import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "ultis/routes";
import EvezForUTab from "nav/EvezForUTab";
import headerBackground from "components/header/headerbackground";
import NotificationRightHeader from "components/NotificationRightHeader";
const Stack = createStackNavigator();
const EvezForUStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: "#FFF",
        headerRight: () => <NotificationRightHeader />,
        
      }}
    >
      <Stack.Screen
        name={ROUTES.EvezForUStack}
        component={EvezForUTab}
        options={{
          title: "Events",
          
        }}
      />
    </Stack.Navigator>
  );
});

export default EvezForUStack;
