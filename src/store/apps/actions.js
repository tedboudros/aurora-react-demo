import TYPES from "./types";

//import axios from "axios";
import ipc from "utils/ipc";

import ipcTypes from "constants/ipcTypes";

export const setActiveGameIndex = (index) => (dispatch) => {
  dispatch({ type: TYPES.SET_HOME_GAME_INDEX, payload: index });
};

export const getSteamGames = () => async (dispatch) => {
  dispatch({ type: TYPES.GET_APPS.START });

  console.warn("Fetching steam games");

  const ipcResponse = await ipc(ipcTypes.GET_APPS, "");

  dispatch({
    type: TYPES.GET_APPS.FINISH,
    payload: ipcResponse.data
      .map((game) => {
        const icon = `https://steamcdn-a.akamaihd.net/steam/apps/${game.steamAppID}/header.jpg`;
        return { ...game, icon };
      })
      .sort((a, b) => a.name.localeCompare(b.name)),
  });
};

export const getIsDev = () => async (dispatch) => {
  const isDev = await ipc(ipcTypes.GET_IS_DEV);
  dispatch({ type: TYPES.GET_IS_DEV, payload: isDev });
};

export const startSteamGame = (appId) => async (dispatch) => {
  dispatch({ type: TYPES.START_STEAM_GAME.START, payload: appId });
  await ipc(ipcTypes.START_STEAM_GAME, appId);
  dispatch({ type: TYPES.START_STEAM_GAME.FINISH, payload: appId });
};

export const setAreAppsFetching = (isLoading) => (dispatch) => {
  dispatch({ type: TYPES.SET_ARE_APPS_FETCHING, payload: isLoading });
};

export const setIsAppLoading = (isLoading) => (dispatch) => {
  dispatch({ type: TYPES.SET_IS_APP_LOADING, payload: isLoading });
};

export const quitApp = () => async (dispatch) => {
  dispatch({ type: TYPES.QUIT_APP.START });
  await ipc(ipcTypes.QUIT_APP);
};

export const toggleFullscreen = () => async (dispatch) => {
  dispatch({ type: TYPES.TOGGLE_FULLSCREEN.START });
  await ipc(ipcTypes.TOGGLE_FULLSCREEN);
};

export const checkIfGameIsRunning = async (appID) => {
  const isGameRunning = await ipc(ipcTypes.CHECK_IF_GAME_IS_RUNNING, appID);
  return isGameRunning.data;
};
