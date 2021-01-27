import { GET_ALL_COMPANIES } from "../actionTypes";

const initialState = {
  companies: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPANIES:
      console.log("REDUCER GET_ALL_COMPANIES", action.payload);
      return {
        companies: action.payload,
      };
    default:
      return state;
  }
}
