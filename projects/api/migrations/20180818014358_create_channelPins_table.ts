import Knex from 'knex';

import { constants, timestamps } from './helpers';

const channelPinsTableName = 'channelPins';
const channelsTableName = 'channels';
const messagesTableName = 'messages';

const channelIdColumnName = 'channelId';
const messageIdColumnName = 'messageId';

export async function up(knex: Knex): Promise<void> {
  await createChannelPinsTable(knex);
}

async function createChannelPinsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(channelPinsTableName, table => {
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
      .integer(messageIdColumnName)
      .unsigned()
      .references(`${messagesTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.unique([channelIdColumnName, messageIdColumnName]);

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropChannelPinsTable(knex);
}

async function dropChannelPinsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(channelPinsTableName);
}
