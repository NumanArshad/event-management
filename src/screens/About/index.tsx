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
  const { login_Session: {user_name, earn_credits, followers, following} } = getState()?.auth;
  const item = {
    coverImage: require("assets/Profile/CoverImage.png"),
    avatar: require("assets/Profile/Avatar.png"),
    userName: user_name,
    address: "Washington, DC",
    followers: followers?.length,
    following: following?.length,
    numberMessage: 2,
    reward: earn_credits || "Zero",
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
