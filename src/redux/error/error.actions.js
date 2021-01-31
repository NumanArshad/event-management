import { unAuthorized } from "redux/auth/auth.actions";
import store from "redux/store";
import { alertMessage } from "ultis/alertToastMessages";

const { dispatch } = store;

export const errorActions = (errorResponse) => {
  const { status, data } = errorResponse;
  if (status === 401) {
    dispatch(unAuthorized());
  } else if (status === 422) {
    if (data?.errors) {
      // obj[Object.keys(obj)[0]] return first key value
      //Object.keys(data?.errors)[0] return first key
      alertMessage(data?.errors[Object.keys(data?.errors)[0]]);
    } else {
      alertMessage(data.message);
      console.log("ERR", data);
    }
  } else {
    alertMessage(data?.message);
  }
};
