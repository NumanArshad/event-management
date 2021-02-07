import {
  GET_ALL_TRENDING_EVENTS,
  GET_ALL_ATTENDED_EVENTS,
  GET_SINGLE_EVENT,
  CLEAR_SINGLE_EVENT,
  CLEAR_ALL_EVENTS,
  GET_ALL_COMPANIES,
} from "../actionTypes";
import axios from "ultis/services/httpServices";

export const getCompanies = () => (dispatch) => {
  axios.get("donation/non-business-organizations").then((res) => {
    if (res?.data?.status_code === 200) {
      ////console.log("ALL getCompanies", res.data);

      dispatch({
        type: GET_ALL_COMPANIES,
        payload: res?.data?.data,
      });
    }
  });
};

export const sendDonation = (data, Alert) => (dispatch) => {
  ////console.log("sendDonation", data, Alert);
  axios
    .post("donation/send-donation", data)
    .then((res) => {
      if (res?.data?.status_code === 200) {
        Alert.alert("", res.data.message);
      }
    })
    .catch((err) => {
      ////console.log("Error", err.response.data.message);
      Alert.alert("", err.response.data.message);
    });
};

// export const clearCompanies = () => (dispatch) => {
//   dispatch({
//     type: CLEAR_ALL_EVENTS,
//   });
// };
