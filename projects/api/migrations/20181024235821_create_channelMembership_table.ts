import Knex from 'knex';

import { constants, timestamps } from './helpers';

const channelMembershipsTableName = 'channelMemberships';
const channelsTableName = 'channels';
const usersTableName = 'users';

const channelIdColumnName = 'channelId';
const memberIdColumnName = 'memberId';
const roleColumnName = 'role';

const ownerRole = 'owner';

export async function up(knex: Knex): Promise<void> {
  await createChannelMembershipsTable(knex);
  await createUniqueOwnerIndex(knex);
}

async function createChannelMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(channelMembershipsTableName, table => {
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
      .integer(memberIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.string(roleColumnName, 32).notNullable();

    table.unique([channelIdColumnName, memberIdColumnName]);

    timestamps({ knex, table });
  });
}

async function createUniqueOwnerIndex(knex: Knex): Promise<void> {
  const uniqueIndexQuery = `
    CREATE UNIQUE INDEX ${channelMembershipsTableName}_${roleColumnName}_index
    ON "${channelMembershipsTableName}" ("${roleColumnName}")
    WHERE "${roleColumnName}" = '${ownerRole}';
  `;

  await knex.schema.raw(uniqueIndexQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropChannelMembershipsTable(knex);
}

async function dropChannelMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(channelMembershipsTableName);
}
