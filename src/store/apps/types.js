import asyncType from "utils/asyncType";

export default {
  SET_HOME_GAME_INDEX: "SET_HOME_GAME_INDEX",
  SET_HOME_IS_LOADING: "SET_HOME_IS_LOADING",
  ...asyncType("START_STEAM_GAME"),
  ...asyncType("GET_APPS"),
  ...asyncType("QUIT_APP"),
  ...asyncType("TOGGLE_FULLSCREEN"),
};
