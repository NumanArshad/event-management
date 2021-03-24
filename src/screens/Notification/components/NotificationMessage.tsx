import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FONTS from "ultis/fonts";
import { height_screen, width_screen } from "ultis/dimensions";

interface Props {
  avatar: any;
  userName: any;
  message: any;
  time: any;
  un_Read: boolean;
}

const NotificationMessage = memo((props: Props) => {
  const backGroundColor = {
    backgroundColor: props.un_Read ? "#F7F8FA" : "#FFF",
  };
  console.log(props.avatar);
  return (
    <TouchableOpacity style={[styles.notificationMessage, backGroundColor]}>
      <Image source={{ uri: props.avatar }} style={styles.image} />
      <View style={styles.content}>
        {/* <Text style={styles.txtUserName}>
          {props.userName ? props.userName : "Name"}
        </Text> */}
        <Text style={styles.txtMessage}>{props.message}</Text>
        <Text style={styles.txtTime}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default NotificationMessage;

const styles = StyleSheet.create({
  notificationMessage: {
    flexDirection: "row",
    height: height_screen * 0.12,
    paddingHorizontal: 0.064 * width_screen,
    paddingVertical: 0.022 * height_screen,
  },
  image: {
    marginHorizontal: 0.04 * width_screen,
    width: width_screen * 0.16,
    height: height_screen * 0.08,
    borderRadius: 100,
  },
  content: {
    marginLeft: 0.04 * width_screen,
  },
  txtUserName: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: "#353B48",
  },
  txtMessage: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: "#353B48",
    marginVertical: 0.01 * height_screen,
    textTransform: "capitalize",
  },
  txtTime: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: "#7F8FA6",
  },
  txtSend: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: "#7F8FA6",
  },
});
