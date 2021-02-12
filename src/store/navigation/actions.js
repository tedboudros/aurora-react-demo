import TYPES from "./types";

export const setIsButtonDown = (isDown) => (dispatch) => {
  dispatch({ type: TYPES.SET_IS_BUTTON_DOWN, payload: isDown });
};
