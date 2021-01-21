import {
  GET_SINGLE_EVENT_ALL_REVIEWS,
  CLEAR_SINGLE_EVENT_ALL_REVIEWS
} from "../actionTypes";

const initialState = {
  all_reviews: null,
  //single_event: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_EVENT_ALL_REVIEWS:
      return {
        ...state,
        all_reviews: action.payload,
      };
    case CLEAR_SINGLE_EVENT_ALL_REVIEWS:
      return {
        ...state,
        all_reviews: null,
      };
    // case CLEAR_SINGLE_EVENT:
    //   return {
    //     ...state,
    //     single_event: null,
    //   };
    default:
      return state;
  }
}
