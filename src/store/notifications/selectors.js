import { createSelector } from "reselect";

const selectNotificationState = (state) => state.notifications;

export const selectNotification = createSelector(
  selectNotificationState,
  (state) => state.notifications
);
