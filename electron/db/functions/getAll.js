const getAll = (db, table) => {
  const res = db.exec(`SELECT * FROM ${table};`);
  const { values, columns } = res.length ? res[0] : { values: [] };

  return values.map((value) => {
    return Object.assign(
      {},
      ...columns.map((column, index) => ({ [column]: value[index] }))
    );
  });
};

module.exports = getAll;
