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
      .references(`${channelsTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .integer('senderId')
      .unsigned()
      .references(`${usersTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .integer('parentMessageId')
      .unsigned()
      .references(`${messagesTableName}.id`)
      .onDelete(constants.onDelete.cascade);

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
