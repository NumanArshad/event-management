import {
  IS_AUTHENTICATED,
  NOT_AUTHORIZED,
  UPDATE_AUTH_USER,
} from "../actionTypes";

const defaultSession = {
  auth_token: null,
  user_name: null,
  email: null,
  contact: null,
  earn_credits: 0,
  //followers: [],
 // following: [],
  friends: [],
  friendRequests: [],
  groups: [],
  user_doc_id: null,
  user_id: null,
  image: null,
  deviceToken: null,
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
    case UPDATE_AUTH_USER:
      return {
        ...state,
        login_Session: {
          ...state.login_Session,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
