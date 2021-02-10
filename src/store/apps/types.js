import asyncType from "utils/asyncType";

export default {
  SET_HOME_GAME_INDEX: "SET_HOME_GAME_INDEX",
  SET_IS_APP_LOADING: "SET_IS_APP_LOADING",
  SET_ARE_APPS_FETCHING: "SET_ARE_APPS_FETCHING",
  ...asyncType("START_STEAM_GAME"),
  ...asyncType("GET_APPS"),
  ...asyncType("QUIT_APP"),
  ...asyncType("TOGGLE_FULLSCREEN"),
};
