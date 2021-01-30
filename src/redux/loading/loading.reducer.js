import {
  START_AUTH_LOADING,
  START_LOADING,
  STOP_AUTH_LOADING,
  STOP_LOADING,
} from "../actionTypes";

const initialState = {
  loading: false,
  authloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return { loading: true };
    case STOP_LOADING:
      return { loading: false };
    case START_AUTH_LOADING:
      return { ...state, authloading: true };
    case STOP_AUTH_LOADING:
      return { ...state, authloading: false };
    default:
      return state;
  }
}
