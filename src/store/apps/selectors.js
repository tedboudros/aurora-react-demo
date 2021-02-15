import { createSelector } from "reselect";

const selectHomeState = (state) => state.apps;

export const selectActiveApp = createSelector(
  selectHomeState,
  (state) => state.activeApp
);

export const selectAreAppsFetching = createSelector(
  selectHomeState,
  (state) => state.areAppsFetching
);

export const selectIsAppLoading = createSelector(
  selectHomeState,
  (state) => state.isAppLoading
);

export const selectSteamGames = createSelector(
  selectHomeState,
  (state) => state.steamGames
);

export const selectIsDev = createSelector(
  selectHomeState,
  (state) => state.isDev
);
