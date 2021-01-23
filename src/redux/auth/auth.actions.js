import axios from "ultis/services/httpServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IS_AUTHENTICATED, NOT_AUTHORIZED, USER_PROFILE } from "../actionTypes";

export const login = (data) => (dispatch) => {
  axios.post("auth/login", data).then((res) => {
    if (res.data.status_code === 200) {
      dispatch(setUserSessions(res.data.data));
    }
  });
};

export const register = (data) => {
  return axios.post("auth/register", data);
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

export const getProfile = () => (dispatch) => {
  axios.get("auth/my-profile").then((res) => {
    console.log("Response PROFILE:", res.data.data.user);
    if (res.data.status_code === 200) {
      dispatch({
        type: USER_PROFILE,
        payload: res.data.data.user,
      });
    }
  });
};

// export const logout = async () => {
//   try {
//   } catch (err) {
//     console.log("logut error");
//   }
// };
// No Worries! You can easily recover your account with the e-mail
//             address you have on file with us. Please enter your email below and
//             we will respond within 1-2 minutes.

////set token in async storage////
export const setUserSessions = (data) => (dispatch) => {
  const { user, token } = data;
  AsyncStorage.setItem("User", JSON.stringify(user));
  AsyncStorage.setItem("Token", token);
  dispatch(isAuthenticated({ user, token }));
};

//// get token from async storage///
export const getUserSessions = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("Token");
    const user = await AsyncStorage.getItem("User");
    token && dispatch(isAuthenticated({ user: JSON.parse(user), token }));
    dispatch(getProfile());
  } catch (error) {
    console.error("error is ", error);
  }
};

export const SetItem_AsynsStorage = (key, data) => {
  try {
    AsyncStorage.setItem(key, data);
  } catch (e) {
    console.log("Error While Adding Data to AsyncStorage");
  }
};

export const isAuthenticated = (payload) => (dispatch) => {
  dispatch({
    type: IS_AUTHENTICATED,
    payload,
  });
};

export const unAuthorized = () => (dispatch) => {
  dispatch({
    type: NOT_AUTHORIZED,
  });
};

// export const GetItem_AsynsStorage = async (key) => {
//   return await AsyncStorage.getItem(key);
// };
