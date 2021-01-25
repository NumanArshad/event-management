import { GET_ALL_USERS, GET_SINGLE_USER } from "../actionTypes";
import axios from "ultis/services/httpServices";
import firebase from "ultis/services/FirebaseConfig";
import { isAuthenticated, setUserSessions } from "redux/auth/auth.actions";
import FriendList from "screens/FriendList";

const userCollectionRef = firebase.firestore().collection("users");

export const getAllUsers = (callBack) => {
  userCollectionRef.onSnapshot(
    (
      res //console.log("res is ", res)
    ) => {
      let usersList = [];
      res.forEach((element) => {
        // console.log("singleis ", element?.data())
        usersList.push({
          id: element?.id,
          ...element?.data(),
        });
      });
      callBack(usersList);
    }
  );
};

export const getUsersbyDocRefList = (fiendsListIds, callBack) => {

  
  firebase
    .firestore()
    .runTransaction((transaction) => {
      let lst = [];
      fiendsListIds.forEach((docId) => {
        const docRef = userCollectionRef.doc(docId);
        transaction.get(docRef).then((friendPayload) => {
          if (friendPayload?.exists) {
            lst.push({
              id: friendPayload?.id,
              ...friendPayload?.data(),
            });
          }
        });
      });
      return Promise.resolve(lst);
    })
    .then((trResponse) => {
      console.log("response is ", trResponse);
      callBack && callBack(trResponse);
    })
    .catch((err) => Promise.reject(err.message));
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

export const getSingleUser = (user_id, isAuthCallBack) => {
  // console.log("userid ", user_id);
  userCollectionRef
    .where("user_id", "==", user_id)
    .limit(1)
    .get()
    .then((res) => {
      let userInfo = {};
      res.forEach((payload) => {
        //     console.log("payload is", payload.data());

        userInfo = { ...payload.data(), user_doc_id: payload.id };
      });
      console.log("so useris", userInfo);
      isAuthCallBack && isAuthCallBack(userInfo);
    });
};

export const addFriend = (payload) => {
  let followers = [];
  followers.push(payload);
  userCollectionRef
    .doc("lCGhe5QtiDUZ7NyGxP8v")
    .update({
      followers,
    })
    .then((res) => {
      console.log("Response ", res);
    });
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
//   return await userCollectionRef.snapshot(res => )
// };
