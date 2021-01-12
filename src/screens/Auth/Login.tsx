import React, { memo } from "react";
import { ScrollView, Text } from "react-native";
import UserItem from "components/UserItem";

const Login = memo(() => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text>login screen</Text>
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Birdie Price"}
        numberFollower={"16K"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Janie Watts"}
        numberFollower={"490"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Esther Schultz"}
        numberFollower={"6K"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Lillian Snyder"}
        numberFollower={"5K"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Effie Schneider"}
        numberFollower={"39"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Roy Francis"}
        numberFollower={"282"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Birdie Horton"}
        numberFollower={"25K"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Genevieve Doyle"}
        numberFollower={"45989"}
      />
    </ScrollView>
  );
});

export default Login;
