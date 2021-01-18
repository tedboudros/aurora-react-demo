const fs = require("fs").promises;
const { exec } = require("child_process");
const { parse } = require("@node-steam/vdf");

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

const getSteamGamesList = () =>
  new Promise(async (resolve) => {
    let games = [];

    const libraryFolders = await getSteamLibraryDirectories();

    let libraryFolderCounter = 0;

    libraryFolders.forEach(async (libraryFolder) => {
      libraryFolderCounter++;

      const dirList = await fs.readdir(libraryFolder);
      const gameFiles = dirList.filter((file) => file.includes(".acf"));

      let gameCounter = 0;

      gameFiles.forEach(async (gameFile) => {
        gameCounter++;

        const gameACFPath = `${libraryFolder}/${gameFile}`;

        const file = await fs.readFile(gameACFPath, steam.encoding);
        const parsedFile = parse(file)["AppState"];

        const finalGame = {
          installDir: libraryFolder,
          platform: steam.platform,
          ...parsedFile,
        };

        games.push(finalGame);

        if (
          games.length === gameFiles.length &&
          libraryFolderCounter === libraryFolders.length
        )
          resolve(games);
      });
    });
  });

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
