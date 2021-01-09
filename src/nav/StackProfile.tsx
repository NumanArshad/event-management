import React, {memo, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from 'ultis/routes';
import {headerBackground} from 'nav/Main';
import TabProfile from 'nav/TabProfile';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SvgNotificationIcon from 'svgs/Proflie/SvgNotificationIcon';
import SvgSettingIcon from 'svgs/Proflie/SvgSettingsIcon';
import {useNavigation} from '@react-navigation/native';
import FONTS from 'ultis/fonts';

const Stack = createStackNavigator();
const StackProfile = memo(() => {
  const navigation = useNavigation();
  const onNotification = useCallback(() => {
    navigation.navigate(ROUTES.Notification);
  }, [navigation]);
  const onSettings = useCallback(() => {
    navigation.navigate(ROUTES.Settings);
  }, [navigation]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name={ROUTES.TabProfile}
        component={TabProfile}
        options={{
          title: 'Hieu Le',
          headerRight: () => (
            <View style={styles.headeRight}>
              <View style={styles.btnNotification}>
                <TouchableOpacity onPress={onNotification}>
                  <SvgNotificationIcon />
                </TouchableOpacity>
                <View style={styles.notification}>
                  <Text style={styles.txtNotification}>1</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.btnSetting} onPress={onSettings}>
                <SvgSettingIcon />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
});

export default StackProfile;

const styles = StyleSheet.create({
  headeRight: {
    flexDirection: 'row',
    right: 12,
  },
  btnNotification: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSetting: {
    flex: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    position: 'absolute',
    right: 2,
    top: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNotification: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: '#ED3269',
  },
});
