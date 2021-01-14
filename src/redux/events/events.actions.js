import { GET_ALL_TRENDING_EVENTS } from "../actionTypes";
import axios from "ultis/services/httpServices";

export const getAllTrendingEvents = () => (dispatch) => {
  axios.get("event/upcomming-events").then((res) => {
    //console.log("upcomging events is ",res?.data?.status_code ,res?.data?.data)
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_ALL_TRENDING_EVENTS,
        payload: res?.data?.data,
      });
    }
  });
};
