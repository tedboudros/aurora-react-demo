const fs = require("fs").promises;
const { exec } = require("child_process");
const { parse } = require("@node-steam/vdf");
const { flatten } = require("lodash");

const steam = require("./steamConstants");

const isNumeric = (str) => {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
};

const getSteamLibraryDirectories = () =>
  new Promise(async (resolve) => {
    const librariesFile = await fs.readFile(
      `${steam.baseDir}/steamapps/libraryfolders.vdf`,
      steam.encoding
    );
    const parsedFile = parse(librariesFile)["LibraryFolders"];

    const libraryFolders = [
      steam.baseDir,
      ...Object.keys(parsedFile)
        .filter((key) => isNumeric(key))
        .map((key) => parsedFile[key]),
    ].map((dir) => `${dir}/steamapps/`);

    resolve(libraryFolders);
  });

const getSteamGamesListFromLibrary = async (dir) => {
  const dirList = await fs.readdir(dir);
  const gameFiles = dirList.filter((file) => file.includes(".acf"));

  return gameFiles
    .map(async (gameFile) => {
      const gameACFPath = `${dir}/${gameFile}`;

      const file = await fs.readFile(gameACFPath, steam.encoding);
      const parsedFile = parse(file)["AppState"];

      const finalGame = {
        installDir: dir,
        platform: steam.platform,
        ...parsedFile,
      };

      if (!steam.blacklistIds.includes(parsedFile.appid)) return finalGame;
      return null;
    })
    .filter((t) => t);
};

const getSteamGamesList = async () => {
  const libraryFolders = await getSteamLibraryDirectories();

  console.log(`Steam library folders detected: [${libraryFolders.join(", ")}]`);

  const mappedGamesFromLibraries = await Promise.all(
    libraryFolders.map(async (dir) => await getSteamGamesListFromLibrary(dir))
  );

  const games = await Promise.all(flatten(mappedGamesFromLibraries));

  console.log(`Games found: ${games.length}`);

  return games;
};

const startSteamGame = (appId) => {
  const command = `"${steam.baseDir}/steam.exe" -applaunch ${appId}`;

  console.log(`Launching steam game with appId: ${appId}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stdout) console.log(`stdout: ${stdout}`);
    if (stderr) console.error(`stderr: ${stderr}`);
  });
};

module.exports = {
  startSteamGame,
  getSteamLibraryDirectories,
  getSteamGamesList,
};
