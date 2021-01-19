const { ipcMain } = require("electron");
const { getSteamGamesList, startSteamGame } = require("../game/index");

const ipcTypes = require("./constants");

const filterOutBadGames = (games) => {
  return games.filter((game) => (!game ? false : Object.keys(game).length));
};

module.exports = () => {
  ipcMain.on(ipcTypes.START_STEAM_GAME.REQ, (event, arg) => {
    startSteamGame(arg);
  });

  ipcMain.on(ipcTypes.GET_STEAM_GAMES.REQ, (event, arg) => {
    getSteamGamesList().then((gameList) => {
      event.reply(ipcTypes.GET_STEAM_GAMES.RES, filterOutBadGames(gameList));
    });
  });
};
