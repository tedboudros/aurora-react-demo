import TYPES from "./types";

import axios from "axios";

const { ipcRenderer } = window.require("electron");

export const setActiveGameIndex = (index) => (dispatch) => {
  dispatch({ type: TYPES.SET_HOME_GAME_INDEX, payload: index });
};

export const getSteamGames = () => (dispatch) => {
  dispatch({ type: TYPES.GET_STEAM_GAMES.START });
  console.log("Fetching steam games");
  ipcRenderer.send("getSteamGameList", "");
  ipcRenderer.on("replyWithSteamGameList", (event, gamesList) => {
    dispatch({
      type: TYPES.GET_STEAM_GAMES.FINISH,
      payload: gamesList
        .map((game) => {
          const icon = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appId}/header.jpg`;
          return { ...game, icon };
        })
        .sort((a, b) => a.name.localeCompare(b.name)),
    });
  });
};

export const startSteamGame = (appId) => (dispatch) => {
  dispatch({ type: TYPES.START_STEAM_GAME.START, payload: appId });
  ipcRenderer.send("startSteamGame", appId);
  dispatch({ type: TYPES.START_STEAM_GAME.FINISH, payload: appId });
};

export const setIsHomeLoading = (isLoading) => (dispatch) => {
  dispatch({ type: TYPES.SET_HOME_IS_LOADING, payload: isLoading });
};
