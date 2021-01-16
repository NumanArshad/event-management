import { IS_AUTHENTICATED, NOT_AUTHORIZED } from "../actionTypes";

const initialState = {
  is_authenticated: false,
  login_Session: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        is_authenticated: true,
        login_Session: action.payload
      };
    case NOT_AUTHORIZED:
      return {
        is_authenticated: false,
        login_Session: null
      };
    default:
      return state;
  }
}
