import { GET_ALL_USERS, GET_SINGLE_USER } from "../actionTypes";
import axios from "ultis/services/httpServices";
import firebase from "ultis/services/FirebaseConfig";
import { isAuthenticated, setUserSessions } from "redux/auth/auth.actions";
import FriendList from "screens/FriendList";
import isEmpty from "ultis/isEmpty";

const userCollectionRef = firebase.firestore().collection("users");

////New user signup store user in firestore collection///
export const addUser = (payload, auth_token) => (dispatch) => {
  userCollectionRef
    .add({
      ...payload,
    })
    .then((res) => {
      dispatch(
        isAuthenticated({
          ...payload,
          user_doc_id: res?.id,
          auth_token,
        })
      );
      setUserSessions({ token: auth_token, user: payload?.user_id });
    });
};

export const getSingleUser = (user_id, isAuthCallBack) => {
  // console.log("userid ", user_id);
  userCollectionRef
    .where("user_id", "==", user_id)
    .limit(1)
    .get()
    .then((res) => {
      let userInfo = {};
      res.forEach((payload) => {
        
        userInfo = { ...payload.data(), user_doc_id: payload.id };
      });
      isAuthCallBack && isAuthCallBack(userInfo);
    });
};

///except friend request and friend docs////
export const getAllUsers = (exceptionalUser, callBack) => {
  userCollectionRef.onSnapshot((res) => {
    let usersList = [];
    res.forEach((element) => {
      if (!exceptionalUser.includes(element?.id)) {
        usersList.push({
          id: element?.id,
          ...element?.data(),
        });
      }
    });
    callBack(usersList);
  });
};

export const getUsersbyDocRefList = (usersDocIdsList, callBack) => {
  if (usersDocIdsList?.length) {
    userCollectionRef
      .where("__name__", "in", usersDocIdsList)
      .onSnapshot((res) => {
        let usersList = [];
        res.forEach((element) => {
          usersList.push({
            id: element?.id,
            ...element?.data(),
          });
        });
        callBack(usersList);
      });
  }
};

///update user and auth login session///
export const sendFriendRequest = (
  requestReceipentDocId,
  friendRequests,
  loginUserId
) => {
  console.log("param is ", requestReceipentDocId, friendRequests, loginUserId);
  userCollectionRef
    .doc(requestReceipentDocId)
    .update({
      friendRequests,
    })
    .then((res) => {
      console.log("very good");
    });
};

///approve/reject friend request
export const UpdateFriendRequestStatus = (payload) => {};

export const requestPayout = (data) => {
  return axios.post("payout/send-request", data);
};
