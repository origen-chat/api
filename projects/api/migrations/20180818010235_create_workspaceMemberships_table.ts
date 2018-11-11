import Knex from 'knex';

import { constants, timestamps } from './helpers';

const workspaceMembershipsTableName = 'workspaceMemberships';
const usersTableName = 'users';
const workspacesTableName = 'workspaces';

const memberIdColumnName = 'memberId';
const workspaceIdColumnName = 'workspaceId';
const roleColumnName = 'role';

const ownerRole = 'owner';

export async function up(knex: Knex): Promise<void> {
  await createWorkspaceMembershipsTable(knex);
  await createUniqueOwnerIndex(knex);
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
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade);

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.cascade);

    table.string(roleColumnName, 32).notNullable();

    table.unique([workspaceIdColumnName, memberIdColumnName]);

    timestamps({ knex, table });
  });
}

async function createUniqueOwnerIndex(knex: Knex): Promise<void> {
  const uniqueIndexQuery = `
    CREATE UNIQUE INDEX ${workspaceMembershipsTableName}_${roleColumnName}_index
    ON "${workspaceMembershipsTableName}" ("${roleColumnName}")
    WHERE "${roleColumnName}" = '${ownerRole}';
  `;

  await knex.schema.raw(uniqueIndexQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspaceMembershipsTable(knex);
}

async function dropWorkspaceMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspaceMembershipsTableName);
}
