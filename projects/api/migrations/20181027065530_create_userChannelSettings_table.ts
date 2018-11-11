import Knex from 'knex';

import { constants, timestamps } from './helpers';

const userChannelSettingsTableName = 'userChannelSettings';
const channelMembershipsTableName = 'channelMemberships';

const channelMembershipIdColumnName = 'channelMembershipId';

export async function up(knex: Knex): Promise<void> {
  await createUserChannelSettingsTable(knex);
}

async function createUserChannelSettingsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(userChannelSettingsTableName, table => {
    table
      .integer(channelMembershipIdColumnName)
      .unsigned()
      .references('id')
      .inTable(channelMembershipsTableName)
      .onDelete(constants.onDelete.cascade)
      .primary()
      .notNullable();

    table.jsonb('configuration').notNullable();

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropUserChannelSettingsTable(knex);
}

async function dropUserChannelSettingsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(userChannelSettingsTableName);
}
