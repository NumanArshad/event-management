import {
  GET_ALL_TRENDING_EVENTS,
  GET_ALL_SAVED_EVENTS,
  GET_SINGLE_EVENT,
  CLEAR_SINGLE_EVENT,
  CLEAR_ALL_EVENTS,
  GET_ALL_RESERVED_EVENTS,
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

// EventTypes
// Consultation
// lead
// Participation
// Entertainment

export const getFilteredEvents = (location, type) => (dispatch) => {
  axios
    .get(`event/filter?location=${location}&organization_id=&type=${type}`)
    .then((res) => {
      if (res?.data?.status_code === 200) {
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
      console.log("saved are", res?.data?.data);
      dispatch({
        type: GET_ALL_SAVED_EVENTS,
        payload: res?.data?.data,
      });
    }
  });
};

export const getAllReserverEvents = () => (dispatch) => {
  axios.get("event/reserved-spot-events").then((res) => {
    if (res?.data?.status_code === 200) {
      console.log("getAllReserverEvents are", res?.data?.data);
      dispatch({
        type: GET_ALL_RESERVED_EVENTS,
        payload: res?.data?.data,
      });
    }
  });
};

export const getAllEvents = (eventStatus = "upcoming") => (dispatch) => {
  axios.get(`event/${eventStatus}-events`).then((res) => {
    if (res?.data?.status_code === 200) {
      console.log("attended are", res?.data?.data);
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

export const saveEvent = (id, Alert) => (dispatch) => {
  console.log("saveEvent", id);
  axios.get(`event/save-event?event_id=${id}`).then((res) => {
    if (res?.data?.status_code === 200) {
      Alert.alert("", res.data.message);
    }
  });
};

export const unSaveEvent = (id, Alert) => (dispatch) => {
  console.log("unSaveEvent", id);
  axios.get(`event/unsave-event?event_id=${id}`).then((res) => {
    if (res?.data?.status_code === 200) {
      Alert.alert("", res.data.message);
    }
  });
};

export const getEventAttendees = (eventId) => (dispatch) => {};

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
