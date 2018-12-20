import Knex from 'knex';

import { constants, timestamps } from './helpers';

const userGroupChannelsTableName = 'userGroupChannels';
const userGroupsTableName = 'userGroups';
const channelsTableName = 'channels';

const userGroupIdColumnName = 'userGroupId';
const channelIdColumnName = 'channelId';

export async function up(knex: Knex): Promise<void> {
  await createUserGroupChannelsTable(knex);
}

async function createUserGroupChannelsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(userGroupChannelsTableName, table => {
    table
      .integer('id')
      .unsigned()
      .primary();

    table
      .integer(userGroupIdColumnName)
      .unsigned()
      .references('id')
      .inTable(userGroupsTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .integer(channelIdColumnName)
      .unsigned()
      .references('id')
      .inTable(channelsTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropUserGroupChannelsTable(knex);
}

async function dropUserGroupChannelsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(userGroupChannelsTableName);
}
