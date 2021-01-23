import { GET_ALL_USERS, GET_SINGLE_USER } from "../actionTypes";
import axios from "ultis/services/httpServices";
import firebase from "ultis/services/FirebaseConfig";

const usercollectionRef = firebase.firestore().collection("users");

export const getAllUsers = (callBack) => {
  return usercollectionRef.onSnapshot((res) => //console.log("res is ", res)
  {
    let usersList = [];
    res.forEach(element => {
     // console.log("singleis ", element?.data())
      usersList.push({
        id: element?.id,
        ...element?.data()
      })
    });
    callBack(usersList)

  }

  );
};


export const addFriend = (callBack) => {
  return usercollectionRef.onSnapshot((res) => //console.log("res is ", res)
  {
    let usersList = [];
    res.forEach(element => {
     // console.log("singleis ", element?.data())
      usersList.push({
        id: element?.id,
        ...element?.data()
      })
    });
    callBack(usersList)

  }

  );
};


// export const getAllusers = async() => {
//   // axios.get("event/saved-events").then((res) => {
//   //   if (res?.data?.status_code === 200) {
//   //     dispatch({
//   //       type: GET_ALL_SAVED_EVENTS,
//   //       payload: res?.data?.data,
//   //     });
//   //   }
//   // });
//   return await usercollectionRef.snapshot(res => )
// };

/////////////Attend event and attendees/////

export const getSingleEventDetail = (id) => (dispatch) => {
  axios.get(`event/event-detail?event_id=${id}`).then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_SINGLE_EVENT,
        payload: res?.data?.data[0],
      });
    }
  });
};

export const clearAllEvents = () => (dispatch) => {
  dispatch({
    type: CLEAR_ALL_EVENTS,
  });
};

export const clearSingleEvent = () => (dispatch) =>
  dispatch({
    type: CLEAR_SINGLE_EVENT,
  });

////////////////////////get event attendees///////////
