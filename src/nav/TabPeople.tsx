import React, {memo} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ROUTES from 'ultis/routes';
import MayBeYouKnow from 'screens/MayBeYouKnow';
import Explorer from 'screens/Explorer';
import FriendList from "screens/FriendList";
import FriendRequest from "screens/FriendRequest";

const Tab = createMaterialTopTabNavigator();

const PeopleTab = memo(() => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ED3269',
        inactiveTintColor: '#7F8FA6',
        indicatorStyle: {
          backgroundColor: '#ED3269',
        },
        labelStyle:{
          fontSize:10
        }
      }}>
      <Tab.Screen name={ROUTES.MaybeYouKnow} component={MayBeYouKnow} />
      <Tab.Screen name={ROUTES.FriendList} component={FriendList} />
      <Tab.Screen name={ROUTES.FriendRequest} component={FriendRequest} />

    </Tab.Navigator>
  );
});

export default PeopleTab;
