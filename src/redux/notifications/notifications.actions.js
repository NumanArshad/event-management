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
  
       console.log(`token i s, ${token}`)
       if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: 'red',
      });
      }
    } else {
      alertMessage("Must use physical device for notification");
    }
    return token;
  }


export const sendPushNotification = payload => {
  //const { login_Session: { deviceToken } } = getState()?.auth;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      payload
  //     {  
  //      "to": deviceToken,
  //   "title": "hello",
  //   "body": "world" 
  // }
  )
};

 fetch('https://exp.host/--/api/v2/push/send',
  requestOptions).then(
      res => console.log("send response is in token  "+ res)
    ).catch(error => alertMessage("error in token send is"+ error?.response))
} 



// export const sendPushNotification = () => (dispatch, getState) => {
//   const {login_Session:{deviceToken}} = getState()?.auth;

//   fetch('https://fcm.googleapis.com/fcm/send', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'key=AAAAOUCCOgg:APA91bHj6-9xrOGKoCkKahgN_Fx4DZv_-lStCHMWZhMb2oyYaZodZn5TTX2eYZSORobCNBVCOZePEnH3SQBZf_nGWvE7v_sEnKx6JEeeffcPwnX9x9lbO_u82eNalkJ34unDCZ4aOU4i',
//     },
//     body: JSON.stringify({
//       to: deviceToken || 'eZ2FVei0TSag2Phc_BdOiP:APA91bF6Tsml__-Lu7Xmgdk8lQqK5JoqInVSE4T5iH18uWWqWcj9At3GPA3TObyGScoX2GiHEK07SopIyCvWOTBWqJ6Jwp98y8J5v49lrvrHQy0BWDJATyYXTCbjzfvwyDNEpGvGSpOJ',
//       priority: 'normal',
//       data: {
//         experienceId: '@numanarshad.dev/evez_expo_20201116',
//         title: " You've got mail",
//         message: 'Hello world!',
//       },
//     }),
//   })
//   .then(
//     res => { 
//     console.log(JSON.stringify(`send response is ", ${res}`));
//   }
//   ).catch(error => {
//     alertMessage(JSON.stringify(`send error is ", ${error}`));
//   });
// }


export const sendNotification = payload  => {

  notificationCollectionRef.add(payload)
  .then(res => 
    console.log("notfication save succesfully!")) 
    .catch(err => console.log("error is ", err))
}

export const bulkFirestoreHandler = (data, callBack) => {
  Promise.all(data).then(
    res => {
      console.log("bulk send successfully!");
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
   //console.log({notifArray})
    dispatch({
      type: GET_ALL_NOTIFICATIONS,
      payload: notifArray
    })
  })

}