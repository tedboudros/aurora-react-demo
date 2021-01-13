import TYPES from "./types";

export const pushNotification = (notification) => (dispatch) => {
  dispatch({ type: TYPES.PUSH_NOTIFICATION, payload: notification });
};
