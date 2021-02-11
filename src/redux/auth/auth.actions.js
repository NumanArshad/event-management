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

export const login = (data) => (dispatch) => {
  axios.post("auth/login", data).then((res) => {
    if (res.data.status_code === 200) {
      const { user, token } = res.data.data;
   //   dispatch(getProfile(res.data.data.token));
     setUserSessions({ user: user?.id, token });
     getSingleUser(user?.id, (userInfo) =>
       dispatch(isAuthenticated({ ...userInfo, auth_token: token }))
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
              deviceToken: token,
            };
            dispatch(addUser(userPayload, auth_token));
          } catch (error) {
            alertMessage("firebase profile creation error");
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
  ////console.log("Runing getUserSessions");
  dispatch(startAuthLoading());
  try {
    const token = await AsyncStorage.getItem("Token");
    const userId = await AsyncStorage.getItem("user");
    dispatch(stopAuthLoading());

    token &&
      getSingleUser(parseInt(userId), (userInfo) => {
        console.log("profile is ",userInfo )
        dispatch(isAuthenticated({ ...userInfo, auth_token: token }));
      });
  } catch (error) {
    console.error("error is ", error);
    dispatch(stopAuthLoading());
  }
};

export const updateAuthUser = (payload) => (dispatch) => {
  console.log("profile updates is", payload)
  dispatch({
    type: UPDATE_AUTH_USER,
    payload,
  });
};

export const isAuthenticated = (payload) => (dispatch) => {
  dispatch({
    type: IS_AUTHENTICATED,
    payload,
  });
  dispatch(updateUser({isOnline: true}));
  dispatch(stopAuthLoading());
};

export const unAuthorized = () => async(dispatch) => {
 await dispatch(updateUser({isOnline: false}))
 await dispatch({
    type: NOT_AUTHORIZED,
  });
  dispatch(stopAuthLoading());
};