import {
  GET_ALL_TRENDING_EVENTS,
  GET_ALL_SAVED_EVENTS,
  GET_SINGLE_EVENT,
  CLEAR_SINGLE_EVENT,
} from "../actionTypes";

const initialState = {
  all_trending_events: null,
  all_saved_events: null,
  single_event: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRENDING_EVENTS:
      return {
        ...state,
        all_trending_events: action.payload,
      };
      case GET_ALL_SAVED_EVENTS:
        return {
          ...state,
          all_saved_events: action.payload,
        };
    case GET_SINGLE_EVENT:
      return {
        ...state,
        single_event: action.payload,
      };
    case CLEAR_SINGLE_EVENT:
      return {
        ...state,
        single_event: null,
      };
    default:
      return state;
  }
}
