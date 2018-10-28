import db from './db';

/**
 * Closes all connections to the database.
 */
export async function closeDatabaseConnections(): Promise<void> {
  await db.destroy();
}
