const fs = require("fs");
const { exec } = require("child_process");
const { parse } = require("@node-steam/vdf");

const steam = require("./steamConstants");

module.exports.getSteamGameListFromDir = (dir) =>
  new Promise((resolve) => {
    const dirList = fs.readdirSync(dir);
    const gameFiles = dirList.filter((file) => file.includes(".acf"));

    let games = [];

    let closedCounter = 0;

    gameFiles.forEach((gameFile) => {
      const gameACFPath = `${dir}/${gameFile}`;

      const file = fs.readFileSync(gameACFPath, steam.encoding);
      const parsedFile = parse(file)["AppState"];

      const finalGame = {
        installDir: dir,
        appId: parsedFile.appid,
        platform: steam.platform,
        ...parsedFile,
      };

      games.push(finalGame);

      closedCounter++;
      if (closedCounter === gameFiles.length) resolve(games);
    });
  });

module.exports.getSteamLibraryDirectories = () => {};

module.exports.startSteamGame = (appId) => {
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
