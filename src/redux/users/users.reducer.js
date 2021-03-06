import {
  GET_ALL_TRENDING_EVENTS,
  GET_ALL_ATTENDED_EVENTS,
  GET_SINGLE_EVENT,
  CLEAR_SINGLE_EVENT,
  GET_ALL_EARNINGS,
} from "../actionTypes";

const initialState = {
  all_trending_events: null,
  all_attended_events: null,
  single_event: null,
  my_earnings: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRENDING_EVENTS:
      return {
        ...state,
        all_trending_events: action.payload,
      };
    case GET_ALL_ATTENDED_EVENTS:
      return {
        ...state,
        all_attended_events: action.payload,
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
    case GET_ALL_EARNINGS:
      return {
        ...state,
        my_earnings: action.payload,
      };

    default:
      return state;
  }
}
