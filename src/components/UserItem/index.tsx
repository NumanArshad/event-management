import React, { memo, useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SvgFollowed from "svgs/Followers/SvgFollowed";
import SvgFollow from "svgs/Followers/SvgFollow";
import { width_screen, height_screen } from "ultis/dimensions";
import FONTS from "ultis/fonts";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import { addFriend } from "redux/users/users.actions";

// interface Props {
//   user_id: any;
//   user_name: string;
//   numberFollower: string;
//   id: string;
//   actionButton?: string;
// }

const UserItem = memo((props: any) => {
  const [follow, setFollow] = useState(false);
  const onPress = useCallback(() => {
    setFollow(!follow);
    console.log("ID CLICKED", props.id);
    addFriend(props.id);
  }, [follow]);
  const navigation = useNavigation();

  const { actionButton, key, ...userInfo } = props;

console.log("my infi is", userInfo)

  const onPeopleProfile = useCallback(() => {
    navigation.navigate(ROUTES.PeopleProfile, {
      userInfo,
    });
  }, [navigation]);

  const { user_name, followers, image } = userInfo;

  return (
    <TouchableOpacity onPress={onPeopleProfile} style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.txtField}>
        <Text style={styles.txtName}>{user_name}</Text>
        <Text style={styles.txtNumberFollower}>
          {followers?.length} followers
        </Text>
      </View>
      {actionButton === "follow" ? (
        <TouchableOpacity onPress={onPress} style={styles.svg_Follow}>
          {follow ? <SvgFollowed /> : <SvgFollow />}
        </TouchableOpacity>
      ) : props.actionButton === "friendRequest" ? (
        <TouchableOpacity onPress={onPress} style={styles.svg_Follow}>
          <Text>accept or reject</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
});

export default UserItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: width_screen,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    marginHorizontal: 0.04 * width_screen,
  },
  txtName: {
    fontFamily: FONTS.Medium,
    fontSize: 16,
    color: "#353B48",
    marginBottom: 0.01 * height_screen,
  },
  txtNumberFollower: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: "#7F8FA6",
  },
  txtField: {
    flex: 1,
  },
  svg_Follow: {
    marginRight: 0.06 * width_screen,
  },
});
