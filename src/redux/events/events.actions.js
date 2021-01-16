import { 
  GET_ALL_TRENDING_EVENTS, 
  GET_SINGLE_EVENT,
  CLEAR_SINGLE_EVENT } from "../actionTypes";
import axios from "ultis/services/httpServices";

export const getAllTrendingEvents = () => (dispatch) => {
  axios.get("event/upcomming-events").then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_ALL_TRENDING_EVENTS,
        payload: res?.data?.data,
      });
    }
  });
};

export const getSingleEventDetail = (id) => (dispatch) => {
  axios.get(`event/event-detail?event_id=${id}`).then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_SINGLE_EVENT,
        payload: res?.data?.data[0],
      });
    }
  });
};

export const clearSingleEvent = () => dispatch => (
  dispatch({
    type: CLEAR_SINGLE_EVENT
  })
)