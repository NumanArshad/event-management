import {
  START_AUTH_LOADING,
  START_LOADING,
  START_BUTTON_LOADING,
  STOP_BUTTON_LOADING,
  STOP_AUTH_LOADING,
  STOP_LOADING,
} from "../actionTypes";

const initialState = {
  loading: false,
  buttonLoading: false,
  authloading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return { loading: true };
    case STOP_LOADING:
      return { loading: false };
      case START_BUTTON_LOADING:
        console.log("start")
        return { ...state, buttonLoading: true };
      case STOP_BUTTON_LOADING:
        return { ...state, buttonLoading: false };
    case START_AUTH_LOADING:
      return { ...state, authloading: true };
    case STOP_AUTH_LOADING:
      return { ...state, authloading: false };
    default:
      return state;
  }
}
