import * as db from '../core/db';

export async function cleanDatabase(): Promise<void> {
  const tableNames = Object.values(db.tableNames);

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
  await db.default.delete().from(tableName);
}
