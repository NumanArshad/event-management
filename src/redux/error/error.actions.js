import { unAuthorized } from "redux/auth/auth.actions";
import store from "redux/store";
import { alertMessage } from "ultis/alertToastMessages";

const { dispatch } = store;

export const errorActions = (errorResponse) => {
  const { status, data } = errorResponse;
  if (status === 401) {
    dispatch(unAuthorized());
  } else if (status === 422) {
    alertMessage(JSON.stringify(data?.errors));
  } else {
    alertMessage(data?.message);
  }
};