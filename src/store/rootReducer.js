import { combineReducers } from "redux";
import apps from "./apps/reducer";
import notifications from "./notifications/reducer";
import drawer from "./drawer/reducer";

const combinedReducer = combineReducers({
  apps,
  notifications,
  drawer,
});

export default (state, action) => {
  switch (action.type) {
    default:
      return combinedReducer(state, action);
  }
};
