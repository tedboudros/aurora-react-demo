const { ipcMain, app } = require("electron");
const ipcTypes = require("./constants");
const isDev = require("electron-is-dev");

module.exports = () => {
  ipcMain.on(ipcTypes.GET_IS_DEV.REQ, (event, arg) => {
    event.reply(ipcTypes.GET_IS_DEV.RES, isDev);
  });
  ipcMain.on(ipcTypes.QUIT_APP.REQ, (event, arg) => {
    app.quit();
  });
};
