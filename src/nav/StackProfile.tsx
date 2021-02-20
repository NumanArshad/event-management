import React, { memo, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "ultis/routes";
import headerBackground from "components/header/headerbackground";
import TabProfile from "nav/TabProfile";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SvgSettingIcon from "svgs/Proflie/SvgSettingsIcon";
import { useNavigation } from "@react-navigation/native";
import NotificationRightHeader from "components/NotificationRightHeader";

const Stack = createStackNavigator();
const StackProfile = memo(() => {
  const navigation = useNavigation();

  const onSettings = useCallback(() => {
    navigation.navigate(ROUTES.Settings);
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: "#FFF",
      }}
    >
      <Stack.Screen
        name={ROUTES.TabProfile}
        component={TabProfile}
        options={{
          title: "Profile",
          headerRight: () => (
            <NotificationRightHeader>
              <TouchableOpacity style={styles.btnSetting} onPress={onSettings}>
                <SvgSettingIcon />
              </TouchableOpacity>
            </NotificationRightHeader>
          ),
        }}
      />
    </Stack.Navigator>
  );
});

export default StackProfile;

const styles = StyleSheet.create({
  btnSetting: {
    flex: 1,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});