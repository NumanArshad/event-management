import axios from "axios"
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { alertMessage } from "ultis/alertToastMessages";
import firebase from "ultis/services/FirebaseConfig";
import { GET_ALL_NOTIFICATIONS } from "redux/actionTypes";

const notificationCollectionRef = firebase.firestore().collection("notifications");


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


export const sendNotification = payload  => {

  notificationCollectionRef.add(payload)
  .then(res => 
    console.log("notfication save succesfully!")) 
    .catch(err => console.log("error is ", err))
}

export const bulkFirestoreHandler = (data, callBack) => {
  Promise.all(data).then(
    res => {
      alertMessage("bulk send successfully!");
      callBack()
    }
  )
    .catch(error => alertMessage(`error in bulk notification is ${error}`))

}

export const deleteNotification = (senderDocId, receipentDocId, type = 'friendRequest') => {
  console.log("operate params are",{senderDocId, receipentDocId, type})
  notificationCollectionRef.where("senderDocId", "==", senderDocId)
    .where("receipentDocId", "==", receipentDocId).where('type', '==', type)
    .limit(1)
    .get().then(res => {
      let docId = null;
      res.forEach(payload => {
        docId = payload.id;
        console.log("doc id for del not is", payload)

      })

      if (docId) {
        notificationCollectionRef.doc(docId).delete().then(
          res => console.log("doc remove successfully!")
        ).catch(err => console.log("delete error is ", err))
      }
    })
}

export const getAuthNotifications = () => (dispatch, getState) => {
  const {
    login_Session: { user_doc_id },
  } = getState()?.auth;

  

  console.log("docv id", user_doc_id  )

  //alert("jwkfnej")
  notificationCollectionRef.where('receipentDocId','==',user_doc_id)
  .onSnapshot(snapshot => {
    let notifArray = [];
    snapshot.forEach(res => {
      //console.log("res is", res.id)
      notifArray.push({
        ...res.data(),
        id: res.id
      })
    })
   console.log({notifArray})
    dispatch({
      type: GET_ALL_NOTIFICATIONS,
      payload: notifArray
    })
  })

}