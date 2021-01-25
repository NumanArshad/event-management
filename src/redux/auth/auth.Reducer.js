import { IS_AUTHENTICATED, NOT_AUTHORIZED, USER_PROFILE } from "../actionTypes";

const defaultSession = {
  auth_token: null,
  name: null,
  email: null,
  contact: null,
  earn_credits: 0,
  followers: [],
  following: [],
  friends: [],
  groups: [],
  user_doc_id: null,
  user_id: null,
  image: null,
  device_token: null,
  stripe_account: null,
};

const initialState = {
  is_authenticated: false,
  login_Session: {
    ...defaultSession,
  },
  // login_User: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        is_authenticated: true,
        login_Session: action.payload,
      };
    case NOT_AUTHORIZED:
      return {
        is_authenticated: false,
        login_Session: defaultSession,
      };
    default:
      return state;
  }
}
