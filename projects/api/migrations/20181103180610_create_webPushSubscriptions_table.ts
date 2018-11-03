import Knex from 'knex';

import { constants, timestamps } from './helpers';

const webPushSubscriptionsTableName = 'webPushSubscriptions';
const usersTableName = 'users';

const userIdColumnName = 'userId';
const endpointColumnName = 'endpoint';

export async function up(knex: Knex): Promise<void> {
  await createWebPushSubscriptionsTable(knex);
}

async function createWebPushSubscriptionsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(webPushSubscriptionsTableName, table => {
    table
      .integer(userIdColumnName)
      .unsigned()
      .references(`${usersTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.string(endpointColumnName).notNullable();

    table.string('auth').notNullable();
    table.string('p256dh').notNullable();

    table.primary([userIdColumnName, endpointColumnName]);

    timestamps({ knex, table, updatedAt: false });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropWebPushSubscriptionsTable(knex);
}

async function dropWebPushSubscriptionsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(webPushSubscriptionsTableName);
}
