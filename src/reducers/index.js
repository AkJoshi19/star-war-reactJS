import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  searchPlanets: searchReducer,
  authReducer:authReducer
});

export default rootReducer;
