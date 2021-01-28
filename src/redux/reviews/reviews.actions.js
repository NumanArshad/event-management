import {
  GET_SINGLE_EVENT_ALL_REVIEWS,
  CLEAR_SINGLE_EVENT_ALL_REVIEWS,
} from "../actionTypes";
import axios from "ultis/services/httpServices";

export const getEventAllReviews = (eventId) => (dispatch) => {
  axios.get(`review/get-reviews?event_id=${eventId}`).then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch({
        type: GET_SINGLE_EVENT_ALL_REVIEWS,
        payload: res?.data?.data,
      });
    }
  });
};

export const postEventReview = (data) => (dispatch) => {
  console.log("postEventReview", data);
  axios.post("review/rate-event", data).then((res) => {
    if (res?.data?.status_code === 200) {
      dispatch(getEventAllReviews(data?.event_id));
      console.log("Posted");
    }
  });
};

export const clearEventAllReviews = (_) => (dispatch) => {
  dispatch({
    type: CLEAR_SINGLE_EVENT_ALL_REVIEWS,
  });
};
// export const clearSingleEvent = () => dispatch => (
//   dispatch({
//     type: CLEAR_SINGLE_EVENT
//   })
// )
