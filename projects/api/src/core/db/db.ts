import Knex, { Config as KnexConfig } from 'knex';

import { env } from '../../config';
import { isTestEnvironment } from '../../helpers';
import logger from '../logger';

export type KnexEnvironment = 'production' | 'development' | 'test';

export type KnexConfigs = Record<KnexEnvironment, KnexConfig>;

const client = 'pg';

const testDbName = 'loop_test';

const connection: Knex.ConnectionConfig = {
  host: env.dbHost,
  user: env.dbUser,
  password: env.dbPassword,
  database: isTestEnvironment ? testDbName : env.dbName,
};

export const knexConfigs: KnexConfigs = {
  production: {
    client,
    connection,
    pool: { min: 2, max: 10 },
  },
  development: {
    client,
    connection,
    pool: { min: 2, max: 5 },
  },
  test: {
    client,
    connection,
    pool: { min: 2, max: 5 },
  },
};

export const knexConfig = knexConfigs[env.environment];

export const db = Knex(knexConfig);

logger.info('📚 database (PostgreSQL) connections initialized');

export default db;
