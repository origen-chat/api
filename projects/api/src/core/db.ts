import Knex, { Config as KnexConfig } from 'knex';

import { env } from '../config';

export type KnexEnvironment = 'production' | 'development' | 'test';

export type KnexConfigs = Readonly<{ [P in KnexEnvironment]: KnexConfig }>;

const client = 'pg';

const connection: Knex.ConnectionConfig = {
  host: env.dbHost,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
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

const knexConfig = knexConfigs[env.environment as KnexEnvironment];

const db = Knex(knexConfig);

export default db;
