const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

const ipcFunction = require("./ipc");

let installExtension, REACT_DEVELOPER_TOOLS;

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: "#000",
    webPreferences: {
      nodeIntegration: true,
    },
    vibrancy: "dark",
    show: false,
  });

  win.removeMenu();
  win.maximize();
  win.show();

  if (!isDev) win.setFullScreen(true);

  win.loadURL(
    isDev
      ? "http://localhost:23000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(() => {
  createWindow();

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`));
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcFunction();
