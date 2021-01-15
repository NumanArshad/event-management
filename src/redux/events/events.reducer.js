import { GET_ALL_TRENDING_EVENTS } from "../actionTypes";

const initialState = {
  all_trending_events: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRENDING_EVENTS:
      return { ...state, all_trending_events: action.payload };
    // case STOP_LOADING:
    //   return { loading: true };
    default:
      return state;
  }
}
