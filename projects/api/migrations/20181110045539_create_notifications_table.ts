import Knex from 'knex';

import { timestamps } from './helpers';

const notificationsTableName = 'notifications';

export async function up(knex: Knex): Promise<void> {
  await createNotificationsTable(knex);
}

async function createNotificationsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(notificationsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string('action', 64).notNullable();

    table.jsonb('data').notNullable();

    timestamps({ knex, table, updatedAt: false });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropNotificationsTable(knex);
}

async function dropNotificationsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(notificationsTableName);
}
