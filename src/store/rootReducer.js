import { combineReducers } from "redux";
import apps from "./apps/reducer";
import notifications from "./notifications/reducer";
import navigation from "./navigation/reducer";
import drawer from "./drawer/reducer";

const combinedReducer = combineReducers({
  apps,
  notifications,
  drawer,
  navigation,
});

export default (state, action) => {
  switch (action.type) {
    default:
      return combinedReducer(state, action);
  }
};
