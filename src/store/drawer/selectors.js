import { createSelector } from "reselect";

const selectDrawerState = (state) => state.drawer;

export const selectIsDrawerOpen = createSelector(
  selectDrawerState,
  (state) => state.isOpen
);
