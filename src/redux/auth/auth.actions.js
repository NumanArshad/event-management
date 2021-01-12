import { post } from "ultis/services/httpServices";
import axios from "ultis/services/httpServices";

export const login = (data) => {
  axios.post("auth/login", data).then((res) => console.log("respnse is ", res));
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
