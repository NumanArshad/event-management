import { combineReducers } from "redux";
import authReducer from "./auth/auth.Reducer";
import loadingReducer from "./loading/loading.reducer";
import eventsReducer from "./events/events.reducer";
import reviewsReducer from "./reviews/reviews.reducer";
import eventAttendance from "./attendEvent/attendEvent.reducer";
import donateReducer from "./donate/donate.Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  events: eventsReducer,
  reviews: reviewsReducer,
  attendance: eventAttendance,
  donate: donateReducer,
});

export default rootReducer;
