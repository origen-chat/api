import Knex from 'knex';

import { constants, timestamps } from './helpers';

const userGroupsTableName = 'userGroups';
const workspacesTableName = 'workspaces';

const workspaceIdColumnName = 'workspaceId';

export async function up(knex: Knex): Promise<void> {
  await createUserGroupsTable(knex);
}

async function createUserGroupsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(userGroupsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string('name', 64).notNullable();

    table.string('description', 256).nullable();

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropUserGroupsTable(knex);
}

async function dropUserGroupsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(userGroupsTableName);
}
