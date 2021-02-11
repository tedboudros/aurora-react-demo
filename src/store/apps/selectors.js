import { createSelector } from "reselect";

const selectHomeState = (state) => state.apps;

export const selectActiveGameIndex = createSelector(
  selectHomeState,
  (state) => state.activeGame
);

export const selectActiveGame = createSelector(selectHomeState, (state) =>
  state.steamGames && state.steamGames.length && state.activeGame !== null
    ? state.steamGames[state.activeGame]
    : {}
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

export const selectActiveGameTitle = createSelector(selectHomeState, (state) =>
  state.steamGames && state.steamGames.length && state.activeGame !== null
    ? state.steamGames[state.activeGame].name
    : ""
);
