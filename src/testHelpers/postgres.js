const core = require('../core/index.ts');

async function cleanDatabase() {
  const tableNames = Object.values(core.db.tableNames);

  await deleteFromTables(tableNames);
}

async function deleteFromTables(tableNames) {
  const deleteFromTablePromises = tableNames.map(tableName => {
    deleteFromTable(tableName);
  });

  await Promise.all(deleteFromTablePromises);
}

async function deleteFromTable(tableName) {
  await core.db.default.delete().from(tableName);
}

module.exports.cleanDatabase = cleanDatabase;
