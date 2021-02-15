import React, { memo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SearchBar from "components/SearchBar";
import ListEvent from "screens/TabSearchEvents/components/ListEvent";
import ListHotKeysNews from "screens/SearchNews/components/ListHotKeysNews";
import { adsBannerId } from "data/ads";
import { AdMobBanner } from "expo-ads-admob";
import UserItem from "components/UserItem";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { height_screen, width_screen } from "ultis/dimensions";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";

const TabSearchEvents = memo(() => {
  const [value, setValue] = useState("");
  const navigation = useNavigation();
  const toCreateGroup = () => {
    navigation.navigate(ROUTES.CreateGroup);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
        <UserItem
          image={require("assets/Followers/img.jpg")}
          user_name="Group Name"
          key={1}
        />
      </ScrollView>
      {/* <TouchableOpacity style={styles.iconPlus}> */}
      <Ionicons
        name="create-outline"
        size={30}
        color="#fff"
        style={styles.iconPlus}
        onPress={toCreateGroup}
      />
      {/* </TouchableOpacity> */}
    </View>
  );
});

export default TabSearchEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  iconPlus: {
    position: "absolute",
    bottom: height_screen * 0.05,
    height: height_screen * 0.075,
    width: width_screen * 0.15,
    backgroundColor: "#ED3269",
    borderRadius: 50,
    paddingLeft: width_screen * 0.035,
    paddingTop: height_screen * 0.01,
    alignSelf: "flex-end",
    right: width_screen * 0.05,
    borderWidth: 0.4,
    borderColor: "#a4a4a4",
  },
});
