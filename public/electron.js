const path = require("path");
const fs = require("fs");
const readline = require("readline");
const { ipcMain } = require("electron");
const { exec } = require("child_process");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS;

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    backgroundColor: "#000B13",
    webPreferences: {
      nodeIntegration: true,
    },
    vibrancy: "light",
    show: false,
  });

  win.removeMenu();
  win.maximize();
  win.show();
  //win.setFullScreen(true);

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:23000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  createWindow();

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`));
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("startSteamGame", (event, arg) => {
  const command = `"C:/Program Files (x86)/Steam/steam.exe" -applaunch ${arg}`;

  console.log(`Launching steam game with appId: ${arg}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stdout) console.log(`stdout: ${stdout}`);
    if (stderr) console.error(`stderr: ${stderr}`);
  });
});

ipcMain.on("getSteamGameList", (event, arg) => {
  const steamLibrary = "D:/SteamLibrary/steamapps";

  new Promise((resolve) => getSteamGameListFromDir(resolve, steamLibrary)).then(
    (gameList) => {
      event.reply("replyWithSteamGameList", gameList);
    }
  );

  //console.log(gameFiles); // prints "ping"
});

const getSteamGameListFromDir = (resolve, dir) => {
  const dirList = fs.readdirSync(dir);
  const gameFiles = dirList.filter((file) => file.includes(".acf"));

  let games = [];

  let closedCounter = 0;

  gameFiles.forEach((gameFile) => {
    const appId = gameFile
      .replace("appmanifest_", "")
      .replace(".acf", "")
      .replace(" ", "");
    let name = "";

    const gameACFPath = `${dir}/${gameFile}`;
    const rl = readline.createInterface({
      input: fs.createReadStream(gameACFPath),
    });

    rl.on("line", (line) => {
      if (line.includes("name")) {
        name = line.replaceAll('"', "").replace("	name		", "");

        const game = {
          name,
          appId,
        };

        games.push(game);
      }
    });

    rl.on("close", () => {
      closedCounter++;

      if (closedCounter === gameFiles.length) resolve(games);
    });
  });
};
