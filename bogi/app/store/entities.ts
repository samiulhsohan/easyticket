import { combineReducers } from "redux";
import staticDataReducer from "./staticData";
import configReducer from "./config";
import searchReducer from "./search";

export default combineReducers({
  staticData: staticDataReducer,
  config: configReducer,
  search: searchReducer,
});
