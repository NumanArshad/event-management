import loadingReducer from "./loading/loading.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  loadingReducer,
});

export default rootReducer;
