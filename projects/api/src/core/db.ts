import Knex, { Config as KnexConfig } from 'knex';

import { env } from '../config';

export type KnexEnvironment = 'production' | 'development' | 'test';

export type KnexConfigs = Readonly<{ [P in KnexEnvironment]: KnexConfig }>;

export const knexConfigs: KnexConfigs = {
  production: {
    client: 'pg',
    connection: {
      host: env.dbHost,
      user: env.dbUser,
      password: env.dbPassword,
      database: env.dbName,
    },
    pool: { min: 2, max: 10 },
  },
  development: {
    client: 'pg',
    connection: {
      host: env.dbHost,
      user: env.dbUser,
      password: env.dbPassword,
      database: env.dbName,
    },
    pool: { min: 2, max: 5 },
  },
  test: {
    client: 'pg',
    connection: {
      host: env.dbHost,
      user: env.dbUser,
      password: env.dbPassword,
      database: env.dbName,
    },
    pool: { min: 2, max: 5 },
  },
};

const knexConfig = knexConfigs[env.environment as KnexEnvironment];

const db = Knex(knexConfig);

export default db;
