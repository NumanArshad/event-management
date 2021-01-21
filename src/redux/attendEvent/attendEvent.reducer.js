import {
  GET_ALL_EVENT_ATTENDEES,
CLEAR_ALL_EVENT_ATTENDEES
} from "../actionTypes";

const initialState = {
  all_event_attendees: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENT_ATTENDEES:
      return {
        all_event_attendees: action.payload,
      };
    default:
      return state;
  }
}
