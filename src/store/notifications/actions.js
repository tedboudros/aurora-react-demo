import TYPES from "./types";

export const setNotification = (notification) => (dispatch) => {
  dispatch({ type: TYPES.SET_NOTIFICATION, payload: notification });
};
