import Knex from 'knex';

import { constants, timestamps } from './helpers';

const botsTableName = 'bots';
const appsTableName = 'apps';

export async function up(knex: Knex): Promise<void> {
  await createBotsTable(knex);
}

async function createBotsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(botsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .string('username', 64)
      .notNullable()
      .unique();

    table.string('displayName', 64).notNullable();

    table
      .integer('appId')
      .unsigned()
      .references('id')
      .inTable(appsTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropBotsTable(knex);
}

async function dropBotsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(botsTableName);
}
