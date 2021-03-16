import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "ultis/routes";
import EvezForUTab from "nav/EvezForUTab";
import headerBackground from "components/header/headerbackground";
import NotificationRightHeader from "components/NotificationRightHeader";
import GroupTab from "./GroupTab";
import CreateGroup from "screens/Group/CreateGroup";
import Friendlist from "screens/FriendList";
const Stack = createStackNavigator();
const GroupStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: "#FFF",
        headerRight: () => <NotificationRightHeader />,
      }}
    >
      <Stack.Screen
        name={"groups"}
        component={GroupTab}
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
          <Stack.Screen
        name={'add_member'}
        //initialParams=""
        component={Friendlist}
     
      />
    </Stack.Navigator>
  );
});

export default GroupStack;
