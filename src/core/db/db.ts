import {
  Pool,
  createPool,
  PoolOptions,
  ClientConnectionOptions,
  sql,
} from 'postre';

import { env } from '../../config';
import logger from '../logger';

export const connectionOptions: ClientConnectionOptions = {
  databaseHost: env.dbHost,
  databasePort: env.dbPort,
  databaseUser: env.dbUser,
  databaseUserPassword: env.dbPassword,
  databaseName: env.dbName,
};

const poolOptions: PoolOptions = {
  ...connectionOptions,
  minClients: env.dbPoolMinClients,
  maxClients: env.dbPoolMaxClients,
};

// eslint-disable-next-line import/no-mutable-exports
export let db: Pool;

/**
 * Starts the connection pool of the database.
 */
export async function startDB(): Promise<void> {
  db = createPool(poolOptions);

  logger.info('📚 database (PostgreSQL) connections initialized');

  await db.query(sql`SELECT 1`);

  logger.info('📚 database (PostgreSQL) ready');
}

/**
 * Closes all connections to the database.
 */
export async function closeDatabaseConnections(): Promise<void> {
  await db.destroy();

  logger.info('📚 database (PostgreSQL) connections closed');
}
