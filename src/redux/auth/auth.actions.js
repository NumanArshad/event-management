import axios from "ultis/services/httpServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const login = (data) => {
  return axios.post("auth/login", data);
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

// No Worries! You can easily recover your account with the e-mail
//             address you have on file with us. Please enter your email below and
//             we will respond within 1-2 minutes.

////set token in async storage////
export const setUser = (authInfo) => {};

//// get token from async storage///
export const getUser = () => {};

export const SetItem_AsynsStorage = (key, data) => {
  try {
    AsyncStorage.setItem(key, data);
    console.log("Set Key AsyncStorage", data);
  } catch (e) {
    // saving error
    console.log("Error While Adding Data to AsyncStorage");
  }
};

export const GetItem_AsynsStorage = async (key) => {
  return await AsyncStorage.getItem(key);
};
