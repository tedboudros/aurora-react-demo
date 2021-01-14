const fs = require("fs");
const readline = require("readline");
const { exec } = require("child_process");

module.exports.getSteamGameListFromDir = (dir) =>
  new Promise((resolve) => {
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
  });

module.exports.startSteamGame = (appId) => {
  const command = `"C:/Program Files (x86)/Steam/steam.exe" -applaunch ${appId}`;

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
