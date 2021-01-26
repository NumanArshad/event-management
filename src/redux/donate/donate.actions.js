import {
  GET_ALL_TRENDING_EVENTS,
  GET_ALL_SAVED_EVENTS,
  GET_SINGLE_EVENT,
  CLEAR_SINGLE_EVENT,
  CLEAR_ALL_EVENTS,
  GET_ALL_COMPANIES,
} from "../actionTypes";
import axios from "ultis/services/httpServices";

export const getCompanies = () => (dispatch) => {
  axios.get("donation/non-business-organizations").then((res) => {
    if (res?.data?.status_code === 200) {
      console.log("ALL getCompanies", res.data);

      dispatch({
        type: GET_ALL_COMPANIES,
        payload: res?.data?.data,
      });
    }
  });
};

// export const clearCompanies = () => (dispatch) => {
//   dispatch({
//     type: CLEAR_ALL_EVENTS,
//   });
// };
