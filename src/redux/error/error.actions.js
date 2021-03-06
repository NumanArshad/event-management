import { unAuthorized, logout } from "redux/auth/auth.actions";
import { GET_ALL_ERRORS, CLEAR_ERRORS } from "../actionTypes";
import { alertMessage } from "ultis/alertToastMessages";

export const errorActions = (errorResponse) => (dispatch) => {
  const { status, data } = errorResponse;

  //console.log(Object.va(data?.message))
  if (status === 401 && !data?.message) {
    dispatch(logout());
  } else if (status === 422) {
    if (data?.errors) {
      // obj[Object.keys(obj)[0]] return first key value
     console.log(data?.errors[Object.keys(data?.errors)[0]]);
    } else {
    //  alertMessage(data.message);
    console.log("ERR", data);
    }
  } else {
    ////console.log("no found message is", data);
    //alertMessage(data?.message);
    dispatch({
      type: GET_ALL_ERRORS,
      payload: data?.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
