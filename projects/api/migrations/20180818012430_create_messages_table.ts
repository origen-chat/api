import Knex from 'knex';

import { constants, timestamps } from './helpers';

const messagesTableName = 'messages';
const channelsTableName = 'channels';
const usersTableName = 'users';

const channelIdColumnName = 'channelId';

export async function up(knex: Knex): Promise<void> {
  await createMessagesTable(knex);
}

async function createMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(messagesTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(channelIdColumnName)
      .unsigned()
      .references('id')
      .inTable(channelsTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .integer('senderId')
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .integer('parentMessageId')
      .unsigned()
      .references('id')
      .inTable(messagesTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table.jsonb('content').notNullable();

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropMessagesTable(knex);
}

async function dropMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(messagesTableName);
}
