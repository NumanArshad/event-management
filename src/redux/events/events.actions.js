import {
  GET_ALL_TRENDING_EVENTS,
  GET_ALL_SAVED_EVENTS,
  GET_SINGLE_EVENT,
  CLEAR_SINGLE_EVENT,
  CLEAR_ALL_EVENTS,
} from "../actionTypes";
import axios from "ultis/services/httpServices";

export const getAllTrendingEvents = () => (dispatch) => {
  axios.get("event/upcomming-events").then((res) => {
    if (res?.data?.status_code === 200) {
     // console.log("ALL EENTS", res.data);

      dispatch({
        type: GET_ALL_TRENDING_EVENTS,
        payload: res?.data?.data,
      });
    }
  });
};

export const getAllSavedEvents = () => (dispatch) => {
  axios.get("event/saved-events").then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_ALL_SAVED_EVENTS,
        payload: res?.data?.data,
      });
    }
  });
};

/////////////Attend event and attendees/////

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

export const clearAllEvents = () => (dispatch) => {
  dispatch({
    type: CLEAR_ALL_EVENTS,
  });
};

export const clearSingleEvent = () => (dispatch) =>
  dispatch({
    type: CLEAR_SINGLE_EVENT,
  });

////////////////////////get event attendees///////////
