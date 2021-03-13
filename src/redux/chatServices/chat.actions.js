import { bulkFirestoreHandler, sendNotification, sendPushNotification } from "redux/notifications/notifications.actions";
import { alertMessage } from "ultis/alertToastMessages";
import firebase from "ultis/services/FirebaseConfig";

const chatRoomsRef = firebase.firestore().collection("chatRooms");


const chatMessagesRef = (conversionDocId) =>
  chatRoomsRef.doc(conversionDocId).collection("messages");

export const roomUsers = conversationDocId => {
  return new Promise((resolve, reject) =>
    chatRoomsRef.doc(conversationDocId).onSnapshot(snapshot => {
      let users = []
      if (snapshot.exists) {
        users = snapshot?.data()?.roomUsers;
      }
     // console.log("nice to have is ", users)
      resolve(users)
    })
  )
}

  //const roomUserRef = conversionDocId => chatRoomsRef.doc(conversionDocId)
export const joinChatRoom = (conversationDocId, authDocId) => {
  roomUsers(conversationDocId).then(usersList => {
    let updateUsersList = usersList?.length ? [...usersList, authDocId] : [authDocId];
    chatRoomsRef.doc(conversationDocId).set({
      roomUsers: updateUsersList
    })
  })
}

export const leaveChatRoom = (conversationDocId, authDocId) => {
//alertMessage("leaving is")
  roomUsers(conversationDocId).then(usersList => {
    let updateUsersList = usersList?.filter((userDocId) => userDocId!==authDocId);
 console.log({updateUsersList})
    chatRoomsRef.doc(conversationDocId).set({
      roomUsers: updateUsersList
    })
  })
}

const sendMessageNotification = (conversationDocId, { user_doc_id }, messageText, chatUsers) => {

  roomUsers(conversationDocId).then(users => {
    let filterAuthUsers = chatUsers?.filter(({ id: userDocId }) => userDocId !== user_doc_id);

  
    let receipentDeviceToken = filterAuthUsers?.filter(({ id: userDocId, isOnline }) =>
      (!users.includes(userDocId) && isOnline)).map(({ deviceToken }) => (deviceToken));

      console.log({receipentDeviceToken})
    if (receipentDeviceToken?.length) {
      ///push token online users
      const notificationPayload = {
        to: receipentDeviceToken,
        title: "Inbox Message",
        body: messageText
      }
      sendPushNotification(notificationPayload)
    }

    let offlineGroupUsers = filterAuthUsers?.filter(({ isOnline }) => !isOnline);
    if (offlineGroupUsers?.length) {
      let inboxNotificatioOfflineUser = offlineGroupUsers.map(({ id: receipentDocId }) =>
        sendNotification({
          receipentDocId,
          senderDocId: user_doc_id,
          createdAt: new Date(),
          type: "inboxMessage",
        })
      );
      bulkFirestoreHandler(inboxNotificatioOfflineUser, () => alertMessage("offline message sent"))
    }
  })
}
/////initiate chat Rooms if not exist
export const isConversationInitiated = (conversionDocId, initialMsg) => {
  chatMessagesRef(conversionDocId)
    .get()
    .then((res) => {
      if (!res.docs.length) {
        sendMessage(conversionDocId, initialMsg);
      }
    });
};

export const sendMessage = (conversionDocId, messagePayload, authUser, chatUsers) => {
  
  //sendMessageNotification(conversionDocId,authUser, messagePayload?.text, chatUsers );
  chatMessagesRef(conversionDocId)
    .add(messagePayload)
    .then((res) =>
      console.log("conversation inititated success between", conversionDocId)
    );
};

export const getConversation = (conversionDocId, myMessages, callBack) => {
  chatMessagesRef(conversionDocId).orderBy("createdAt").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((changes) => {
      if (changes.type === "added") {
      console.log("chnage data is", changes.doc.data());

      
        myMessages.unshift({
          ...changes.doc.data(),
          id: changes.doc.id,
        });
      }
    });
    callBack(myMessages);
  });
};
