import TYPES from "./types";

const INITIAL_STATE = {
  activeGame: 0,
  isLoading: true,
  steamGames: [],
};

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case TYPES.SET_HOME_GAME_INDEX:
      return {
        ...state,
        activeGame: payload,
      };

    case TYPES.SET_HOME_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    case TYPES.GET_APPS.FINISH:
      return { ...state, steamGames: payload, isLoading: false };

    default:
      return state;
  }
};
