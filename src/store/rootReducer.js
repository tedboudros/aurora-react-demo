import { combineReducers } from "redux";
import home from "./home/reducer";
import notifications from "./notifications/reducer";
import drawer from "./drawer/reducer";

const combinedReducer = combineReducers({
  home,
  notifications,
  drawer,
});

export default (state, action) => {
  switch (action.type) {
    default:
      return combinedReducer(state, action);
  }
};
