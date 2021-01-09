import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from 'ultis/routes';
import TabSearchEvents from 'screens/TabSearchEvents';
import {headerBackground} from 'nav/Main';
const Stack = createStackNavigator();
const StackSearchEvents = memo(() => (
  <Stack.Navigator
    screenOptions={{
      headerBackground: headerBackground,
      headerTintColor: '#FFF',
    }}>
    <Stack.Screen
      name={ROUTES.StackSearchEvents}
      component={TabSearchEvents}
      options={{
        title: 'Search Events',
      }}
    />
  </Stack.Navigator>
));

export default StackSearchEvents;
