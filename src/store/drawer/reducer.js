import TYPES from "./types";

const INITIAL_STATE = {
  isOpen: false,
};

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case TYPES.SET_IS_DRAWER_OPEN:
      return {
        ...state,
        isOpen: payload,
      };

    default:
      return state;
  }
};
