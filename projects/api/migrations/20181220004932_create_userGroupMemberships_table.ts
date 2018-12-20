import Knex from 'knex';

import { constants, timestamps } from './helpers';

const userGroupMembershipsTableName = 'userGroupChannels';
const userGroupsTableName = 'userGroups';
const usersTableName = 'users';

const userGroupIdColumnName = 'userGroupId';
const userIdColumnName = 'userId';

export async function up(knex: Knex): Promise<void> {
  await createUserGroupMembershipsTable(knex);
}

async function createUserGroupMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(userGroupMembershipsTableName, table => {
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
      .integer(userIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropUserGroupMembershipsTable(knex);
}

async function dropUserGroupMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(userGroupMembershipsTableName);
}
