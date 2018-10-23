import Knex from 'knex';

import { constants, timestamps } from './helpers';

const workspaceMembershipsTableName = 'workspaceMemberships';
const usersTableName = 'users';
const workspacesTableName = 'workspaces';

const memberIdColumnName = 'memberId';
const workspaceIdColumnName = 'workspaceId';

export async function up(knex: Knex): Promise<void> {
  await createWorkspaceMembershipsTable(knex);
}

async function createWorkspaceMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(workspaceMembershipsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(memberIdColumnName)
      .unsigned()
      .notNullable()
      .references(`${usersTableName}.id`)
      .onDelete(constants.onDelete.cascade);

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .notNullable()
      .references(`${workspacesTableName}.id`)
      .onDelete(constants.onDelete.cascade);

    table.string('role', 32).notNullable();

    table.unique([memberIdColumnName, workspaceIdColumnName]);

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspaceMembershipsTable(knex);
}

async function dropWorkspaceMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspaceMembershipsTableName);
}
