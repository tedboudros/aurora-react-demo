const initSqlJs = require("sql.js");
const fs = require("fs").promises;

const getHomeDir = require("../utils/getHomeDir");

const initialize = async () => {
  let SQL, dbFile, db;

  try {
    SQL = await initSqlJs();
  } catch (e) {
    console.error(e);
  }

  const homeDir = getHomeDir();

  const filePath = `${homeDir}/Documents/aurora.db`;

  try {
    dbFile = await fs.readFile(filePath);
  } catch (e) {
    dbFile = await fs.writeFile(filePath, "");
  }

  try {
    db = new SQL.Database(dbFile);
  } catch (e) {
    console.error(e);
  }

  return db;
};

module.exports = initialize;
