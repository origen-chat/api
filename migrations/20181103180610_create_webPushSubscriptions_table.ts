import Knex from 'knex';

import { constants, timestamps } from './helpers';

const webPushSubscriptionsTableName = 'webPushSubscriptions';
const usersTableName = 'users';

export async function up(knex: Knex): Promise<void> {
  await createWebPushSubscriptionsTable(knex);
}

async function createWebPushSubscriptionsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(webPushSubscriptionsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .string('endpoint')
      .notNullable()
      .unique();

    table.string('auth').notNullable();
    table.string('p256dh').notNullable();

    timestamps({ knex, table, updatedAt: false });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropWebPushSubscriptionsTable(knex);
}

async function dropWebPushSubscriptionsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(webPushSubscriptionsTableName);
}
