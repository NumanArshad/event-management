import { combineReducers } from "redux";
import loadingReducer from "./loading/loading.reducer";
import eventsReducer from "./events/events.reducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  events: eventsReducer,
});

export default rootReducer;
