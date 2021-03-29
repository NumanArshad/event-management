import { unAuthorized, logout } from "redux/auth/auth.actions";
import { GET_ALL_ERRORS, CLEAR_ERRORS } from "../actionTypes";
import { alertMessage } from "ultis/alertToastMessages";

export const errorActions = (error) => (dispatch) => {
  const { response: { status, data }, config: { url } } = error;
  const isAuth = url.includes("auth");

  if (status === 401 && !isAuth) {
    dispatch(logout());
  } 
  // else if (status === 422) {

  //   if (data?.errors) {
  //     console.log(data?.errors[Object.keys(data?.errors)[0]]);

  //   } else {
  //     console.log("ERR", data);
  //   }
  // } 
  else {
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
