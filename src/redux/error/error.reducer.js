import { GET_ALL_ERRORS, CLEAR_ERRORS } from "../actionTypes";

const initialState = {
  all_errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ERRORS:
      return {
        all_errors: action.payload,
      };

    case CLEAR_ERRORS:
    console.log("clearing error called")
      return {
        all_errors: null,
      };
    default:
      return state;
  }
}
