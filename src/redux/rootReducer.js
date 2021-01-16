import { combineReducers } from "redux";
import authReducer from "./auth/auth.Reducer";
import loadingReducer from "./loading/loading.reducer";
import eventsReducer from "./events/events.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  events: eventsReducer,
});

export default rootReducer;
