import React, {memo} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ROUTES from 'ultis/routes';
import ProfileActivity from 'screens/ProfileActivity';
import ProfileTickets from 'screens/ProfileTickets';
import ProfileSaved from 'screens/ProfileSaved';
import About from 'screens/About';

const Tab = createMaterialTopTabNavigator();

const TabProfile = memo(() => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ED3269',
        inactiveTintColor: '#7F8FA6',
        indicatorStyle: {
          backgroundColor: '#ED3269',
        },
      }}>
      <Tab.Screen name={ROUTES.About} component={About} />
      <Tab.Screen name={ROUTES.ProfileActivity} component={ProfileActivity} />
      <Tab.Screen name={ROUTES.ProfileTickets} component={ProfileTickets} />
      <Tab.Screen name={ROUTES.ProfileSaved} component={ProfileSaved} />
    </Tab.Navigator>
  );
});

export default TabProfile;
