import { post } from "ultis/services/httpServices";
import axios from "ultis/services/httpServices";
import AsyncStorage from "@react-native-community/async-storage";
export const login = (data) => {
  return axios.post("auth/login", data);
};

export const register = (data) => {
  axios
    .post("auth/register", data)
    .then((res) => console.log("respnse is ", res));
};

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
