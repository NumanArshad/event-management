import React, { memo, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "ultis/routes";
import headerBackground from "components/header/headerbackground";
import TabPeople from "nav/TabPeople";
import { StyleSheet, TouchableOpacity } from "react-native";
import SvgHeaderSearch from "svgs/SvgHeaderSearch";
import { useNavigation } from "@react-navigation/native";
import EvezNews from "screens/EvezNews";
import NotificationRightHeader from "components/NotificationRightHeader";

const Stack = createStackNavigator();
const StackCalender = memo(() => {
  const navigation = useNavigation();
  
  const onSearchPeople = useCallback(() => {
    navigation.navigate(ROUTES.SearchPeople);
  }, [navigation]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: "#FFF",
        headerRight: () => <NotificationRightHeader />

      }}
    >
      <Stack.Screen
        name={ROUTES.EvezNews}
        component={EvezNews}
        options={{
          title: "Events on Calender",
          //   headerRight: () => (
          //     <TouchableOpacity style={styles.search} onPress={onSearchPeople}>
          //       <SvgHeaderSearch />
          //     </TouchableOpacity>
          //   ),
         // headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
});

export default StackCalender;

const styles = StyleSheet.create({
  search: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
