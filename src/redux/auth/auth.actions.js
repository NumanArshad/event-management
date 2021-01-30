import axios from "ultis/services/httpServices";
import * as profileAxios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IS_AUTHENTICATED, NOT_AUTHORIZED } from "../actionTypes";
import { addUser, getSingleUser } from "redux/users/users.actions";
import {
  startAuthLoading,
  startLoading,
  stopAuthLoading,
  stopLoading,
} from "redux/loading/loading.actions";

export const login = (data) => (dispatch) => {
  axios.post("auth/login", data).then((res) => {
    if (res.data.status_code === 200) {
      const { user, token } = res.data.data;
      setUserSessions({ user: user?.id, token });
      getSingleUser(user?.id, (userInfo) =>
        dispatch(isAuthenticated({ ...userInfo, auth_token: token }))
      );
    }
    if (res.data.status_code === 422) {
      console.log("Response 422", res.data);
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

export const updateProfile = (data) => {
  return axios.post("auth/update-profile", data);
};

/////instantly call after singup for firestore collection///
export const getProfile = (auth_token) => (dispatch) => {
  profileAxios
    .get("auth/my-profile", {
      headers: { Authorization: `Bearer ${auth_token}` },
    })
    .then((res) => {
      if (res.data.status_code === 200) {
        const userPayload = {
          ...res.data.data.user,
          followers: [],
          following: [],
          friends: [],
          groups: [],
          deviceToken: "token",
        };
        dispatch(addUser(userPayload, auth_token));
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
    console.log("response is ", res);
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
  console.log("Runing getUserSessions");
  dispatch(startAuthLoading());
  try {
    const token = await AsyncStorage.getItem("Token");
    const userId = await AsyncStorage.getItem("user");

    token &&
      getSingleUser(parseInt(userId), (userInfo) => {
        dispatch(isAuthenticated({ ...userInfo, auth_token: token }));
      });
    dispatch(stopAuthLoading());
  } catch (error) {
    console.error("error is ", error);
    dispatch(stopAuthLoading());
  }
};

export const isAuthenticated = (payload) => (dispatch) => {
  dispatch({
    type: IS_AUTHENTICATED,
    payload,
  });
  dispatch(stopAuthLoading());
};

export const unAuthorized = () => (dispatch) => {
  dispatch({
    type: NOT_AUTHORIZED,
  });
  dispatch(stopAuthLoading());
};
