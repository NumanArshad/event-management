import { 
  GET_SINGLE_EVENT_ALL_REVIEWS } from "../actionTypes";
import axios from "ultis/services/httpServices";

export const getEventAllReviews = eventId => (dispatch) => {
  console.log("event id",eventId)
  axios.get(`review/get-reviews?event_id=${eventId}`).then((res) => {
    if (res?.data?.status_code === 200) {
      console.log("response is ", res?.data?.data)
      dispatch({
        type: GET_SINGLE_EVENT_ALL_REVIEWS,
        payload: res?.data?.data,
      });
    }
  });
};

export const postEventReview = data => (dispatch) => {
  axios.post("review/save-review",data).then((res) => {
    if (res?.data?.status_code === 200) {
     dispatch(getEventAllReviews(data?.event_id))
    }
  });
};

// export const clearSingleEvent = () => dispatch => (
//   dispatch({
//     type: CLEAR_SINGLE_EVENT
//   })
// )