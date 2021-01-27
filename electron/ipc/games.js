const { ipcMain } = require("electron");
const {
  getSteamGamesList,
  startSteamGame,
  checkIfGameIsRunning,
} = require("../game/index");

const ipcTypes = require("./constants");

const dbFunctions = require("../db/functions");

const filterOutBadGames = (games) => {
  return games.filter((game) => (!game ? false : Object.keys(game).length));
};

module.exports = (db) => {
  ipcMain.on(ipcTypes.START_STEAM_GAME.REQ, (_, arg) => {
    startSteamGame(arg);
  });

  ipcMain.on(ipcTypes.GET_APPS.REQ, (event) => {
    const dbGames = dbFunctions.getAll(db, "apps");

    if (dbGames.length) {
      event.reply(ipcTypes.GET_APPS.RES, dbGames);
      return;
    }

    getSteamGamesList().then((gameList) => {
      const filteredGames = filterOutBadGames(gameList);
      event.reply(ipcTypes.GET_APPS.RES, filteredGames);

      dbFunctions.add(db, "apps", filteredGames);
    });
  });

  ipcMain.on(ipcTypes.CHECK_IF_GAME_IS_RUNNING.REQ, (event, executables) => {
    checkIfGameIsRunning(executables || []).then((isRunning) =>
      event.reply(ipcTypes.CHECK_IF_GAME_IS_RUNNING.RES, isRunning)
    );
  });
};
