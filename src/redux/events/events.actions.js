import {
  GET_ALL_TRENDING_EVENTS,
  GET_ALL_ATTENDED_EVENTS,
  GET_ALL_SAVED_EVENTS,
  GET_SINGLE_EVENT,
  GET_ALL_RESERVED_EVENTS,
  CLEAR_SINGLE_EVENT,
  CLEAR_ALL_EVENTS,
} from "../actionTypes";
import axios from "ultis/services/httpServices";
import { alertMessage, toastMessages } from "ultis/alertToastMessages";

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

/////////////////////////Event Reservation///////////////
export const getAllReservedEvents = () => (dispatch) => {
  axios.get(`event/reserved-spot-events`).then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_ALL_RESERVED_EVENTS,
        payload: res?.data?.data,
      });
    }
  });
};

export const reserveEvent = (eventId) => (dispatch) => {
  axios.get(`event/reserve-event?event_id=${eventId}`).then((res) => {
    if (res?.data?.status_code === 200) {
      toastMessages('Event Reserved successfully!', 125)
      dispatch(getAllReservedEvents());
    }
  });
};

export const unReserveEvent = (eventId) => (dispatch) => {
  axios.get(`event/unreserve-event?event_id=${eventId}`).then((res) => {
    if (res?.data?.status_code === 200) {
      toastMessages('Event Unreserved successfully!', 125)
      dispatch(getAllReservedEvents());
    }
  });
};
/////////////////////////Event Reservation///////////////

export const getAllSavedEvents = () => (dispatch) => {
 // alert("is")
  axios.get("event/saved-events").then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_ALL_SAVED_EVENTS,
        payload: res?.data?.data,
      });
    }
  });
};

export const getAllAttendedEvents = () => (dispatch) => {
  axios.get("event/attended-events").then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_ALL_ATTENDED_EVENTS,
        payload: res?.data?.data,
      });
    }
  });
};

export const getAllEvents = (eventStatus = "upcoming") => (dispatch) => {
  axios.get(`event/${eventStatus}-events`).then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_ALL_ATTENDED_EVENTS,
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

export const saveEvent = (id) => (dispatch) => {
  ////console.log("saveEvent", id);
  axios.get(`event/save-event?event_id=${id}`).then((res) => {
    if (res?.data?.status_code === 200) {
      alertMessage(res.data.message)
      dispatch(getAllSavedEvents())
    }
  });
};

export const unSaveEvent = (id) => (dispatch) => {
  axios.get(`event/unsave-event?event_id=${id}`).then((res) => {
    if (res?.data?.status_code === 200) {
     alertMessage(res.data.message)
      dispatch(getAllSavedEvents())
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
