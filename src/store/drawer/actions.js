import TYPES from "./types";

export const setIsDrawerOpen = (isOpen) => (dispatch) => {
  dispatch({ type: TYPES.SET_IS_DRAWER_OPEN, payload: isOpen });
};
