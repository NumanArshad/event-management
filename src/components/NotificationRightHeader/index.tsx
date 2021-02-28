import React, { useCallback, useEffect } from "react";
import ROUTES from "ultis/routes";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SvgNotificationIcon from "svgs/Proflie/SvgNotificationIcon";
import { useNavigation } from "@react-navigation/native";
import FONTS from "ultis/fonts";
import { useDispatch, useSelector } from "react-redux";
import { getAuthNotifications } from "redux/notifications/notifications.actions";

const NotificationRightHeader = (props: any) => {
  const navigation = useNavigation();
  const onNotification = useCallback(() => {
    navigation.navigate(ROUTES.Notification);
  }, [navigation]);

  const dispatch = useDispatch();

  const { all_notifications } = useSelector<any, any>(
    (state) => state?.notifications
  );

  useEffect(() => {
    dispatch(getAuthNotifications());
  }, [dispatch]);

  return (
    <View style={styles.headeRight}>
      <View style={styles.btnNotification}>
        <TouchableOpacity onPress={onNotification}>
          <SvgNotificationIcon />
        </TouchableOpacity>
        <View style={styles.notification}>
          <Text style={styles.txtNotification}>
            { all_notifications?.length || ``}
          </Text>
        </View>
      </View>
      {props?.children}
    </View>
  );
};

export default NotificationRightHeader;

const styles = StyleSheet.create({
  headeRight: {
    flexDirection: "row",
    right: 12,
  },
  btnNotification: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  notification: {
    position: "absolute",
    right: 2,
    top: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  txtNotification: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: "#ED3269",
  },
});
