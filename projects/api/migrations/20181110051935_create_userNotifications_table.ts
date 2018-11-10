import Knex from 'knex';

import { constants, timestamps } from './helpers';

const userNotificationsTableName = 'userNotifications';
const notificationsTableName = 'notifications';
const usersTableName = 'users';

const notificationIdColumnName = 'notificationId';
const userIdColumnName = 'userId';

export async function up(knex: Knex): Promise<void> {
  await createUserNotificationsTable(knex);
}

async function createUserNotificationsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(userNotificationsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(notificationIdColumnName)
      .unsigned()
      .references(`${notificationsTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .integer(userIdColumnName)
      .unsigned()
      .references(`${usersTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.timestamp('readAt');

    table.unique([notificationIdColumnName, userIdColumnName]);

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropUserNotificationsTable(knex);
}

async function dropUserNotificationsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(userNotificationsTableName);
}
