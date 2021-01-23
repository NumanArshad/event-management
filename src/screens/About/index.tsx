import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import HeaderProfile from "screens/About/components/HeaderProfile";
import store from "../../redux/store";

const item2 = {
  coverImage: require("assets/Profile/CoverImage.png"),
  avatar: require("assets/Profile/Avatar.png"),
  userName: "Hieu Le",
  address: "Washington, DC",
  followers: "1.5M",
  following: 25,
  numberMessage: 2,
  reward: 15,
  interested: ["#art", "#festival", "#fashion", "#expo..."],
  notification: 1,
};

const About = memo(() => {
  const { getState } = store;
  const { login_User } = getState()?.auth;
  const item = {
    coverImage: require("assets/Profile/CoverImage.png"),
    avatar: require("assets/Profile/Avatar.png"),
    userName: login_User?.user_name,
    address: "Washington, DC",
    followers: "1.5M",
    following: 25,
    numberMessage: 2,
    reward: login_User.earn_credit ? login_User.earn_credit : "Zero",
    interested: ["#art", "#festival", "#fashion", "#expo..."],
    notification: 1,
  };

  return (
    <View style={styles.container}>
      <HeaderProfile
        coverImage={item.coverImage}
        avatar={item.avatar}
        userName={item.userName}
        address={item.address}
        numberMessage={item.numberMessage}
        rewards={item.reward}
        interested={item.interested}
        followers={item.followers}
        following={item.following}
        notification={item.notification}
      />
    </View>
  );
});

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
