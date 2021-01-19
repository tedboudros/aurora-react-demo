const games = require("./games");
const isDev = require("./isDev");

module.exports = () => {
  games();
  isDev();
};
