const { ipcMain } = require("electron");
const { getSteamGameListFromDir, startSteamGame } = require("../game/index");

const ipcTypes = require("../../src/constants/ipcTypes");

module.exports = () => {
  ipcMain.on(ipcTypes.START_STEAM_GAME.REQ, (event, arg) => {
    startSteamGame(arg);
  });

  ipcMain.on(ipcTypes.GET_STEAM_GAMES.REQ, (event, arg) => {
    const steamLibrary = "D:/SteamLibrary/steamapps";

    getSteamGameListFromDir(steamLibrary).then((gameList) => {
      event.reply(ipcTypes.GET_STEAM_GAMES.RES, gameList);
    });
  });
};
