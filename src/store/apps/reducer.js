import TYPES from "./types";

const INITIAL_STATE = {
  activeGame: 0,
  isAppLoading: false,
  areAppsFetching: true,
  steamGames: [],
  isDev: false,
};

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case TYPES.SET_HOME_GAME_INDEX:
      return {
        ...state,
        activeGame: payload,
      };

    case TYPES.SET_ARE_APPS_FETCHING:
      return {
        ...state,
        areAppsFetching: payload,
      };

    case TYPES.GET_IS_DEV:
      return {
        ...state,
        isDev: payload,
      };

    case TYPES.SET_IS_APP_LOADING:
      return {
        ...state,
        isAppLoading: payload,
      };

    case TYPES.GET_APPS.START:
      return {
        ...state,
        areAppsFetching: true,
      };

    case TYPES.GET_APPS.FINISH:
      return { ...state, steamGames: payload, areAppsFetching: false };

    default:
      return state;
  }
};
