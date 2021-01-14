import TYPES from "./types";

import axios from "axios";
import ipcTypes from "constants/ipcTypes";
import ipc from "utils/ipc";

export const setActiveGameIndex = (index) => (dispatch) => {
  dispatch({ type: TYPES.SET_HOME_GAME_INDEX, payload: index });
};

export const getSteamGames = () => async (dispatch) => {
  dispatch({ type: TYPES.GET_STEAM_GAMES.START });

  console.warn("Fetching steam games");

  const ipcResponse = await ipc(ipcTypes.GET_STEAM_GAMES, "");

  dispatch({
    type: TYPES.GET_STEAM_GAMES.FINISH,
    payload: ipcResponse.data
      .map((game) => {
        const icon = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appId}/header.jpg`;
        return { ...game, icon };
      })
      .sort((a, b) => a.name.localeCompare(b.name)),
  });
};

export const startSteamGame = (appId) => async (dispatch) => {
  dispatch({ type: TYPES.START_STEAM_GAME.START, payload: appId });
  await ipc(ipcTypes.START_STEAM_GAME, appId);
  dispatch({ type: TYPES.START_STEAM_GAME.FINISH, payload: appId });
};

export const setIsHomeLoading = (isLoading) => (dispatch) => {
  dispatch({ type: TYPES.SET_HOME_IS_LOADING, payload: isLoading });
};
