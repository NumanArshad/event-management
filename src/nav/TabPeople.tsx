import React, {memo} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ROUTES from 'ultis/routes';
import MayBeYouKnow from 'screens/MayBeYouKnow';
import Explorer from 'screens/Explorer';

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
      }}>
      <Tab.Screen name={ROUTES.MaybeYouKnow} component={MayBeYouKnow} />
      <Tab.Screen name={ROUTES.Explorer} component={Explorer} />
    </Tab.Navigator>
  );
});

export default PeopleTab;
