import TYPES from "./types";

const INITIAL_STATE = {
  notification: 0,
};

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case TYPES.SET_NOTIFICATION:
      return {
        ...state,
        notification: payload,
      };

    default:
      return state;
  }
};
