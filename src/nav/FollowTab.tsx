import React, {memo} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ROUTES from 'ultis/routes';
import Following from 'screens/Following';
import Followers from 'screens/Followers';

const Tab = createMaterialTopTabNavigator();

const FollowTab = memo(() => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ED3269',
        inactiveTintColor: '#7F8FA6',
        indicatorStyle: {
          backgroundColor: '#ED3269',
        },
      }}>
      <Tab.Screen name={ROUTES.Followers} component={Followers} />
      <Tab.Screen name={ROUTES.Following} component={Following} />
    </Tab.Navigator>
  );
});

export default FollowTab;
