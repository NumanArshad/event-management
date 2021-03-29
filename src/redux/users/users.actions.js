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
import { alertMessage } from "ultis/alertToastMessages";
import { stopButtonLoading, stopLoading } from "redux/loading/loading.actions";

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


////Run when other user send friend request or accept/reject
export const getAuthUserObserver = () => (dispatch, getState) => {
  const {login_Session: {user_doc_id}} = getState()?.auth

  userCollectionRef.doc(user_doc_id).onSnapshot(snapshot => {
console.log("auth updated is here", snapshot.data())
    dispatch(updateAuthUser(snapshot.data()));
  })
}

///Update receipent user added in group 'groups field by transaction///
export const receipentTransactions = (users, groupId, callBack) => {


  firebase.firestore().runTransaction(transaction => {
    users.forEach(userId => {
      const userDocRef = userCollectionRef.doc(userId);
      transaction.get(userDocRef).then(userInfo => {
        let { groups } = userInfo.data();
        //console.log("before update", groups, groupId)
        groups = [...groups, groupId];
        //console.log("after update", groups, groupId)

        userDocRef.update({ groups });
      })
    })
    return Promise.resolve();
  })
    .then(res => {console.log("all transaction updated successfully!");
    callBack && callBack(groupId)})
    .catch(error => console.log(`error in updated transaction is ${error}`))
}

export const getUsersbyDocRefList = (
  userDocListIds,
  callBack,
  selectionBehaviour = "in"
) => {
  ////console.log("frine id are", fiendsListIds);
  (selectionBehaviour === "in" && !userDocListIds?.length)
    ? callBack([])
    : userCollectionRef
       //.where("__name__", selectionBehaviour, userDocListIds)
        .onSnapshot((snapshot) => {
          let usersList = [];
          snapshot.forEach((res) => {
            if(selectionBehaviour === "in" && userDocListIds.includes(res?.id)){
              usersList.push({
                id: res?.id,
                ...res?.data(),
              });
            }
            else if(selectionBehaviour !== "in" && !userDocListIds.includes(res?.id)){
              usersList.push({
                id: res?.id,
                ...res?.data(),
              });
            }
           
          });
   // console.log("userdoc is", userDocListIds, selectionBehaviour, usersList);
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

  // console.log("collection is", user_doc_id, payload, updateStatus)

  userCollectionRef
    .doc(user_doc_id)
    .update(payload)
    .then((res) => {
      updateStatus === 'profileUpdated' ? 
      dispatch(updateAuthUser(payload)) :
    //  dispatch(stopLoading());
    dispatch(stopButtonLoading());

    });
};

export const getSingleUser = (user , isAuthCallBack) => {

  const {id: user_id, name: userName} = user;
  userCollectionRef
    .where("user_id", "==", user_id)
    .where("user_name", "==", userName)
    .limit(1)
    .get()
    .then((res) => {
      let userInfo = {};

   //console.log("my user is ", res.docs)
      res.forEach((payload) => {
        
        userInfo = { ...payload.data(), user_doc_id: payload.id };
      });
      // console.log("my info us", userInfo)
      isAuthCallBack?.(userInfo, res.docs?.length );
    });
};



///update user and auth login session///
export const updateFriendRequest = (
  requestReceipentDocId,
  friendRequests
) => {
  //console.log("param is ", requestReceipentDocId, friendRequests);
  userCollectionRef
    .doc(requestReceipentDocId)
    .update({
      friendRequests,
    })
    .then((res) => {
      //console.log("very good");
    });
};

export const addAuthAsFriend = (userDocId, friends) => {
  userCollectionRef
    .doc(userDocId)
    .update({
      friends
    })
    .then((res) => {
      //console.log("very good added ");
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
