import { createSelector } from "reselect";

const selectNavigationState = (state) => state.navigation;

export const selectIsButtonDown = createSelector(
  selectNavigationState,
  (state) => state.isButtonDown
);
