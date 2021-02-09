import axios from "axios"
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { alertMessage } from "ultis/alertToastMessages";

export  async function registerForAsyncPushToken() {
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
  
      console.log("token i s", token)
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


export const sendPushNotification = payload => {
    axios.post('https://exp.host/--/api/v2/push/send',
    payload).then(
        res => console.log("send response is ", res)
    ).catch(error => console.log("error is", error))
}