const { ipcMain } = require("electron");
const {
  getSteamGamesList,
  startSteamGame,
  checkIfGameIsRunning,
} = require("../game/index");

const ipcTypes = require("./constants");

const filterOutBadGames = (games) => {
  return games.filter((game) => (!game ? false : Object.keys(game).length));
};

module.exports = () => {
  ipcMain.on(ipcTypes.START_STEAM_GAME.REQ, (_, arg) => {
    startSteamGame(arg);
  });

  ipcMain.on(ipcTypes.GET_STEAM_GAMES.REQ, (event) => {
    getSteamGamesList().then((gameList) => {
      event.reply(ipcTypes.GET_STEAM_GAMES.RES, filterOutBadGames(gameList));
    });
  });

  ipcMain.on(ipcTypes.CHECK_IF_GAME_IS_RUNNING.REQ, (event, executables) => {
    checkIfGameIsRunning(executables || []).then((isRunning) =>
      event.reply(ipcTypes.CHECK_IF_GAME_IS_RUNNING.RES, isRunning)
    );
  });
};
