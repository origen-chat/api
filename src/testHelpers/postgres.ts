import * as core from '../core';

export async function cleanDatabase(): Promise<void> {
  const tableNames = Object.values(core.db.tableNames);

  await deleteFromTables(tableNames);
}

async function deleteFromTables(
  tableNames: ReadonlyArray<string>,
): Promise<void> {
  const deleteFromTablePromises = tableNames.map(tableName =>
    deleteFromTable(tableName),
  );

  await Promise.all(deleteFromTablePromises);
}

async function deleteFromTable(tableName: string): Promise<void> {
  await core.db.default.delete().from(tableName);
}

module.exports.cleanDatabase = cleanDatabase;
