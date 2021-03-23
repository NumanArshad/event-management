import axios from "axios";
import { clearErrors, errorActions } from "redux/error/error.actions";
import { alertMessage, toastMessages } from "ultis/alertToastMessages";
import { baseApiUrl } from "ultis/constants";
import { startAuthLoading, startButtonLoading, startLoading, stopButtonLoading, stopLoading } from "../../redux/loading/loading.actions";
import store from "../../redux/store";

axios.defaults.baseURL = baseApiUrl;

const { dispatch, getState } = store;

axios.interceptors.request.use(
  (request) => {

    dispatch(
      (request.method === "get" ?
        startLoading :
        startButtonLoading)
        ())
    dispatch(clearErrors());

    const requestUrl = request?.url.split("/")[0];
    const isAuthUrl = [
      "login",
      "register",
      "forget-password",
      "password-reset",
    ].includes(requestUrl);

    if (!isAuthUrl) {
      const { login_Session } = getState()?.auth;

     // console.log(login_Session?.auth_token)

      request.headers.common[
        "Authorization"
      ] = `Bearer ${login_Session?.auth_token}`;
    }
    return request;
  },
  (error) => {
    dispatch(stopLoading());
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {

    dispatch(stopButtonLoading());
    dispatch(stopLoading());

    dispatch(clearErrors());
    return response;
  },
  (error) => {
    dispatch(stopLoading());
    dispatch(stopButtonLoading());
    if (error?.response?.status >= 500) {
      toastMessages("Unexpected error!");
    } else {
      dispatch(errorActions(error));
    }
    return Promise.reject(error);
  }
);

export default {
  post: axios.post,
  put: axios.put,
  get: axios.get,
  delete: axios.delete,
};
