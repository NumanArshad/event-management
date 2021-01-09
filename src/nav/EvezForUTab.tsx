import React, {memo} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ROUTES from 'ultis/routes';
import EventAroundYou from 'screens/EventAroundYou';
import EvezTrending from 'screens/EvezTrending';
import FONTS from 'ultis/fonts';

const Tab = createMaterialTopTabNavigator();
const EvezForUTab = memo(() => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ED3269',
        inactiveTintColor: '#7F8FA6',
        indicatorStyle: {
          backgroundColor: '#ED3269',
        },
        labelStyle: {
          fontFamily: FONTS.Regular,
        },
      }}>
      <Tab.Screen
        name={ROUTES.EventAroundYou}
        component={EventAroundYou}
        options={{
          tabBarLabel: 'FOR YOU',
        }}
      />
      <Tab.Screen
        name={ROUTES.EvezTrending}
        component={EvezTrending}
        options={{
          tabBarLabel: 'TRENDING',
        }}
      />
    </Tab.Navigator>
  );
});
export default EvezForUTab;
