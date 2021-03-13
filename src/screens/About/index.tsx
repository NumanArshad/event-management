import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import HeaderProfile from "screens/About/components/HeaderProfile";
import { getImage } from "ultis/functions";

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

const About = () => {

  const {
    login_Session: {
      user_name,
      earn_credits,
      followers,
      following,
      email,
      image,
    },
  } = useSelector((state) => state?.auth);

  console.log("user name is ", image)
  const item = {
    coverImage: require("assets/Profile/CoverImage.png"),
    avatar: image,
    userName: user_name ? user_name : "Jhon Doe",
    address: email ? email : "Email",
    followers: followers?.length,
    following: following?.length,
    numberMessage: 2,
    reward: earn_credits || "0",
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
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
