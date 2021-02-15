import {
  GET_ALL_EARNINGS,
  GET_ALL_USERS,
  GET_SINGLE_USER,
} from "../actionTypes";
import axios from "ultis/services/httpServices";
import firebase from "ultis/services/FirebaseConfig";
import {
  getProfile,
  isAuthenticated,
  setUserSessions,
  updateAuthUser,
} from "redux/auth/auth.actions";
import FriendList from "screens/FriendList";
import isEmpty from "ultis/isEmpty";

const userCollectionRef = firebase.firestore().collection("users");

export const getAllUsers = (callBack) => {
  userCollectionRef.onSnapshot(
    (
      res 
    ) => {
      let usersList = [];
      res.forEach((element) => {
        usersList.push({
          id: element?.id,
          ...element?.data(),
        });
      });
      callBack(usersList);
    }
  );
};

export const getUsersbyDocRefList = (
  userDocListIds,
  callBack,
  selectionBehaviour = "in"
) => {
  //console.log("frine id are", fiendsListIds);
  (selectionBehaviour === "in" && !userDocListIds?.length)
    ? callBack([])
    : userCollectionRef
        .where("__name__", selectionBehaviour, userDocListIds)
        .onSnapshot((snapshot) => {
          let usersList = [];
          snapshot.forEach((res) => {
            usersList.push({
              id: res?.id,
              ...res?.data(),
            });
          });
          console.log("userdoc is", userDocListIds, selectionBehaviour);
          callBack(usersList);
        });
};

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

////Update auth user on profile update/////
export const updateUser = (payload, updateStatus) => (dispatch, getState) => {
  const {
    login_Session: { user_doc_id },
  } = getState()?.auth;

  console.log("collection is", user_doc_id, payload, updateStatus)

  userCollectionRef
    .doc(user_doc_id)
    .update(payload)
    .then((res) => {
      updateStatus === 'profileUpdated' && dispatch(updateAuthUser(payload));
    });
};

export const getSingleUser = (user_id , isAuthCallBack) => {


  userCollectionRef
    .where("user_id", "==", user_id)
    .limit(1)
    .get()
    .then((res) => {
      let userInfo = {};

   //   console.log("my user is ", res.docs)
      res.forEach((payload) => {
        
        userInfo = { ...payload.data(), user_doc_id: payload.id };
      });
      console.log("my info us", userInfo)
      isAuthCallBack && isAuthCallBack(userInfo, res.docs?.length );
    });
};



///update user and auth login session///
export const updateFriendRequest = (
  requestReceipentDocId,
  friendRequests
) => {
  console.log("param is ", requestReceipentDocId, friendRequests);
  userCollectionRef
    .doc(requestReceipentDocId)
    .update({
      friendRequests,
    })
    .then((res) => {
      console.log("very good");
    });
};

export const addAuthAsFriend = (userDocId, friends) => {
  userCollectionRef
    .doc(userDocId)
    .update({
      friends
    })
    .then((res) => {
      console.log("very good added ");
    });
};

///approve/reject friend request
export const UpdateFriendRequestStatus = (payload) => {};

export const requestPayout = (data) => {
  return axios.post("payout/send-request", data);
};

export const getMyEarning = () => (dispatch) => {
  axios.get(`earning/my-earnings`).then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_ALL_EARNINGS,
        payload: res?.data?.data,
      });
    }
  });
};

// export const getAllusers = async() => {
//   // axios.get("event/saved-events").then((res) => {
//   //   if (res?.data?.status_code === 200) {
//   //     dispatch({
//   //       type: GET_ALL_ATTENDED_EVENTS,
//   //       payload: res?.data?.data,
//   //     });
//   //   }
//   // });
//   return await userCollectionRef.snapshot(res => )
// };
