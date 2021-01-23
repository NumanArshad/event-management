import { IS_AUTHENTICATED, NOT_AUTHORIZED, USER_PROFILE } from "../actionTypes";

const initialState = {
  is_authenticated: false,
  login_Session: null,
  login_User: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        is_authenticated: true,
        login_Session: action.payload,
      };
    case NOT_AUTHORIZED:
      return {
        is_authenticated: false,
        login_Session: null,
      };
    case USER_PROFILE:
      console.log("data", action.payload);
      return { ...state, is_authenticated: true, login_User: action.payload };
    default:
      return state;
  }
}
