import { combineReducers } from "redux";
import home from "./home/reducer";
import reducer from "./notifications/reducer";

const combinedReducer = combineReducers({
  home,
  reducer,
});

export default (state, action) => {
  switch (action.type) {
    default:
      return combinedReducer(state, action);
  }
};
