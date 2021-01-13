import TYPES from "./types";

const INITIAL_STATE = {
  notifications: [],
};

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case TYPES.PUSH_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, payload],
      };

    default:
      return state;
  }
};
