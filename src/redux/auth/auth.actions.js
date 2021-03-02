import axios from "ultis/services/httpServices";
import * as profileAxios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IS_AUTHENTICATED,
  NOT_AUTHORIZED,
  UPDATE_AUTH_USER,
} from "../actionTypes";
import { addUser, getSingleUser, updateUser } from "redux/users/users.actions";
import {
  startAuthLoading,
  startLoading,
  stopAuthLoading,
  stopLoading,
} from "redux/loading/loading.actions";
import { alertMessage } from "ultis/alertToastMessages";
import { registerForAsyncPushToken } from "redux/notifications/notifications.actions";
import isEmpty from "ultis/isEmpty";
import { clearErrors } from "redux/error/error.actions";

export const login = (data) => (dispatch) => {
  axios.post("auth/login", data).then((res) => {
    if (res.data.status_code === 200) {
      const { user, token } = res.data.data;
      setUserSessions({ user: user?.id, token });
      
      getSingleUser(user?.id, (userInfo, docLength) => {
        docLength ?
          dispatch(isAuthenticated({ ...userInfo, auth_token: token })) :
          dispatch(getProfile(token));
      }
      );
    }
  });
};

export const register = (data) => (dispatch) => {
  axios.post("auth/register", data).then((res) => {
    if (res.data.status_code === 200) {
      dispatch(getProfile(res.data.data.token));
    }
  });
};

export const forgotPassword = (data) => {
  return axios.post("auth/forget-password", data);
};

export const changePassword = (data) => {
  return axios.post("auth/update-password", data);
};

export const updateProfile = (data, jsonData) => (dispatch) => {
  axios.post("auth/update-profile", data).then((res) => {
    alertMessage("Your Profile has been Updated Successfully!");
    dispatch(updateUser(jsonData, 'profileUpdated'));
    dispatch(stopLoading());
  });
};

/////instantly call after singup for firestore collection///
export const getProfile = (auth_token) => (dispatch) => {
  profileAxios
    .get("auth/my-profile", {
      headers: { Authorization: `Bearer ${auth_token}` },
    })
    .then((res) => {
      if (res.data.status_code === 200) {
        //console.log("profile response is ", res.data)
        (async () => {
          try {
            const token = await registerForAsyncPushToken();
            const {id: user_id, ...rest} =res.data.data.user;
            const userPayload = {
              ...rest,
              user_id,
              isOnline: true,
              friends: [],
              friendRequests: [],
              groups: [],
              deviceToken: [token],
            };

            dispatch(addUser(userPayload, auth_token));
          } catch (error) {
            alertMessage("firebase profile creation error"+error);
          }
        })();
      }
    });
};

////auth user bank information ////
export const getBankInfo = (authUserId, callBack) => {
  axios.get(`bank/get-info?user_id=${authUserId}`).then((res) => {
    if (res.data.status_code === 200) {
      callBack(res.data.data);
    }
  });
};

export const updateBankInfo = (payload) => {
  axios.post(`bank/update`, payload).then((res) => {
    if (res.data.status_code === 200) {
      alertMessage(res.data.message);
    }
  });
};

////auth user bank information ////

export const logout = () => (dispatch) => {
  AsyncStorage.clear();
  dispatch(unAuthorized());
};
// No Worries! You can easily recover your account with the e-mail
//             address you have on file with us. Please enter your email below and
//             we will respond within 1-2 minutes.

////set token in async storage////
export const setUserSessions = (data) => {
  const { user, token } = data;
  AsyncStorage.setItem("Token", token);
  AsyncStorage.setItem("user", user.toString());
};

//// get token from async storage///
export const getUserSessions = () => async (dispatch) => {
  dispatch(startAuthLoading());
  try {
    const token = await AsyncStorage.getItem("Token");
    const userId = await AsyncStorage.getItem("user");
    token ?
      getSingleUser(parseInt(userId), (userInfo) => {
        dispatch(isAuthenticated({ ...userInfo, auth_token: token }));
      }) :
      dispatch(stopAuthLoading());
  } catch (error) {
    console.error("error is ", error);
    dispatch(stopAuthLoading());
  }
};

export const updateAuthUser = (payload) => (dispatch) => {
 // console.log("profile updates is", payload)
  dispatch({
    type: UPDATE_AUTH_USER,
    payload,
  });
};

export const isAuthenticated = (payload) => (dispatch) => {
  // (async (payload) => {
  //   try {
  //     toastMessages("iif called")
  // const token = await registerForAsyncPushToken();
  // const updatedTokenList = payload?.deviceToken?.includes(token) ?
  //   payload?.deviceToken : [...payload?.deviceToken, token];
 // registerForAsyncPushToken().then(token => {
  //  console.log({payload})
    // const updatedTokenList = payload?.deviceToken?.includes(token) ?
    //   payload?.deviceToken : [...payload?.deviceToken, token];
    dispatch(stopAuthLoading());

    dispatch({
      type: IS_AUTHENTICATED,
      payload,
    });
    dispatch(updateUser({ isOnline: true }))
  //}).catch(error => {
   // console.log("errir in fetch token is" + error)
  //}).finally(onFinall => {

  console.log("stopping")
  //})
};

export const unAuthorized = () => async(dispatch) => {
 await dispatch(updateUser({isOnline: false}))
 await dispatch({
    type: NOT_AUTHORIZED,
  });
  dispatch(stopAuthLoading());
  dispatch(clearErrors());

};