import TYPES from "./types";

const INITIAL_STATE = {
  isButtonDown: false,
};

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case TYPES.SET_IS_BUTTON_DOWN:
      return {
        ...state,
        isButtonDown: payload,
      };

    default:
      return state;
  }
};
