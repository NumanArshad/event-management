import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import { alertMessage } from "ultis/alertToastMessages";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  }),
});

const MyNotification = () => {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {

    registerForAsyncPushToken().then(expoToken => setExpoPushToken(expoToken))
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (rec) => console.log("rece is", rec)
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (rec) => console.log("respnse rece is ", rec)
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View>
      {/* <TouchableOpacity onPress={() => scheduleNotification()}>
        <Text>notification</Text>
        
      </TouchableOpacity>
      <Text>token is {expoPushToken}</Text> */}
    </View>
  );
};

export default MyNotification;

async function scheduleNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "not title",
      body: "notification body ius",
      data: {
        name: "numan asrahd",
      },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForAsyncPushToken() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alertMessage("Notification permission denied by user");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    //console.log("token i s", token)
    //  if (Platform.OS === 'android') {
    // Notifications.setNotificationChannelAsync('default', {
    //   name: 'default',
    //   importance: Notifications.AndroidImportance.MAX,
    //   vibrationPattern: [0, 250, 250, 250],
    //   lightColor: 'red',
    // });
    // }
  } else {
    alertMessage("Must use physical device for notification");
  }
  return token;
}
