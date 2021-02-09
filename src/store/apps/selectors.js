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

export const selectIsHomeLoading = createSelector(
  selectHomeState,
  (state) => state.isLoading
);

export const selectSteamGames = createSelector(
  selectHomeState,
  (state) => state.steamGames
);

export const selectActiveGameTitle = createSelector(selectHomeState, (state) =>
  state.steamGames && state.steamGames.length && state.activeGame !== null
    ? state.steamGames[state.activeGame].name
    : ""
);
