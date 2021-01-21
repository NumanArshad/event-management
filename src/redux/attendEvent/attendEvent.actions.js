import { 
  GET_ALL_EVENT_ATTENDEES,
CLEAR_ALL_EVENT_ATTENDEES} from "../actionTypes";
import axios from "ultis/services/httpServices";

export const getEventAttendees = eventId => (dispatch) => {
  axios.get(`attendance/event-attendees?event_id=${eventId}`).then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_ALL_EVENT_ATTENDEES,
        payload: res?.data?.data,
      });
    }
  });
};

// export const getAllSavedEvents = () => (dispatch) => {
//   axios.get("event/saved-events").then((res) => {
//     if (res?.data?.status_code === 200) {
//       dispatch({
//         type: GET_ALL_SAVED_EVENTS,
//         payload: res?.data?.data,
//       });
//     }
//   });
// };

// /////////////Attend event and attendees/////


// export const getSingleEventDetail = (id) => (dispatch) => {
//   axios.get(`event/event-detail?event_id=${id}`).then((res) => {
//     if (res?.data?.status_code === 200) {
//       dispatch({
//         type: GET_SINGLE_EVENT,
//         payload: res?.data?.data[0],
//       });
//     }
//   });
// };

// export const clearAllEvents = () => dispatch => {
//   dispatch({
//     type: CLEAR_ALL_EVENTS
//   })
// }

// export const clearSingleEvent = () => dispatch => (
//   dispatch({
//     type: CLEAR_SINGLE_EVENT
//   })
// )

// ////////////////////////get event attendees///////////

