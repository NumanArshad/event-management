import firebase from "ultis/services/FirebaseConfig";

const chatRoomsRef = firebase.firestore().collection("chatRooms");

const chatMessagesRef = (conversionDocId) =>
  chatRoomsRef.doc(conversionDocId).collection("messages");
/////initiate chat Rooms if not exist
export const isConversationInitiated = (conversionDocId, initialMsg) => {
  chatMessagesRef(conversionDocId)
    .get()
    .then((res) => {
      if (!res.docs.length) {
        ////console.log("not exist");
        ///Intital chat message/////
        sendMessage(conversionDocId, initialMsg);
      }
    });
};

export const sendMessage = (conversionDocId, initialMsg) => {
  chatMessagesRef(conversionDocId)
    .add(initialMsg)
    .then((res) =>
      console.log("conversation inititated success between", conversionDocId)
    );
};

export const getConversation = (conversionDocId, myMessages, callBack) => {
  chatMessagesRef(conversionDocId).orderBy("createdAt").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((changes) => {
      if (changes.type === "added") {
        ////console.log("chnage data is", changes.doc.data());
        myMessages.unshift({
          ...changes.doc.data(),
          id: changes.doc.id,
        });
      }
    });
    callBack(myMessages);
  });
};
// export const getChatUsersInfo = (userDocRefList) => {
//   firebase.firestore().runTransaction(
//     transformAsync
//   )
// }
// export const getAllAttendedEvents = () => (dispatch) => {
//   axios.get("event/saved-events").then((res) => {
//     if (res?.data?.status_code === 200) {
//       dispatch({
//         type: GET_ALL_ATTENDED_EVENTS,
//         payload: res?.data?.data,
//       });
//     }
//   });
// };

// /////////////Attend event and attendees/////

// export const getSingleEventDetail = (id) => (dispatch) => {
//   axios.get(`event/event-detail?event_id=${id}`).then((res) => {
//     if (res?.data?.status_code === 200) {
//       dispatch({
//         type: GET_SINGLE_EVENT,
//         payload: res?.data?.data[0],
//       });
//     }
//   });
// };

// export const clearAllEvents = () => dispatch => {
//   dispatch({
//     type: CLEAR_ALL_EVENTS
//   })
// }

// export const clearSingleEvent = () => dispatch => (
//   dispatch({
//     type: CLEAR_SINGLE_EVENT
//   })
// )

////////////////////////get event attendees///////////
