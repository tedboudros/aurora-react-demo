const games = require("./games");
const isDev = require("./isDev");

module.exports = (win) => {
  games();
  isDev(win);
};
