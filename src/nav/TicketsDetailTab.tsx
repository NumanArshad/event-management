import React, {memo} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ROUTES from 'ultis/routes';
import Sat from 'screens/Sat';
import Sun from 'screens/Sun';
import Mon from 'screens/Mon';

const Tab = createMaterialTopTabNavigator();

const TicketsDetailTab = memo(() => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ED3269',
        inactiveTintColor: '#7F8FA6',
        indicatorStyle: {
          backgroundColor: '#ED3269',
        },
      }}>
      <Tab.Screen name={ROUTES.SAT} component={Sat} />
      <Tab.Screen name={ROUTES.SUN} component={Sun} />
      <Tab.Screen name={ROUTES.MON} component={Mon} />
    </Tab.Navigator>
  );
});

export default TicketsDetailTab;
