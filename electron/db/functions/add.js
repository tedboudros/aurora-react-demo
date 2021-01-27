const tables = require("../tables");
const serializeObj = require("./serializeObj");

const add = (db, table, item = {}) => {
  const columns = Object.keys(tables[table]);

  const serializedItem = serializeObj(item);

  const values = columns.map((col) => serializedItem[col] || "null").join(", ");

  const statement = `INSERT INTO ${table} VALUES (${values});`;
  console.log(statement);
  db.run(statement);
};

module.exports = add;
