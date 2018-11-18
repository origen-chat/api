import Knex from 'knex';

import { constants, timestamps } from './helpers';

const workspaceMembershipsTableName = 'workspaceMemberships';
const workspacesTableName = 'workspaces';
const usersTableName = 'users';
const botsTableName = 'bots';

const userMemberIdColumnName = 'userMemberId';
const botMemberIdColumnName = 'botMemberId';
const workspaceIdColumnName = 'workspaceId';
const roleColumnName = 'role';

const ownerRole = 'owner';
const botRole = 'bot';

export async function up(knex: Knex): Promise<void> {
  await createWorkspaceMembershipsTable(knex);
  await addOnlyOneNonNullMemberConstraint(knex);
  await addBotsRoleConstraint(knex);
  await createUniqueOwnerIndex(knex);
}

async function createWorkspaceMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(workspaceMembershipsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(userMemberIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade);

    table
      .integer(botMemberIdColumnName)
      .unsigned()
      .references('id')
      .inTable(botsTableName)
      .onDelete(constants.onDelete.cascade);

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.cascade);

    table.string(roleColumnName, 32).notNullable();

    table.unique([workspaceIdColumnName, userMemberIdColumnName]);

    timestamps({ knex, table });
  });
}

async function createUniqueOwnerIndex(knex: Knex): Promise<void> {
  const uniqueIndexQuery = `
    CREATE UNIQUE INDEX ${workspaceMembershipsTableName}_${roleColumnName}_index
    ON "${workspaceMembershipsTableName}" ("${workspaceIdColumnName}", "${roleColumnName}")
    WHERE "${roleColumnName}" = '${ownerRole}';
  `;

  await knex.schema.raw(uniqueIndexQuery);
}

export async function addOnlyOneNonNullMemberConstraint(
  knex: Knex,
): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${workspaceMembershipsTableName}"
    ADD CONSTRAINT only_one_non_null_member
    CHECK (
      (
        ("${userMemberIdColumnName}" IS NOT NULL)::integer
        + ("${botMemberIdColumnName}" IS NOT NULL)::integer
      ) = 1
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function addBotsRoleConstraint(knex: Knex): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${workspaceMembershipsTableName}"
    ADD CONSTRAINT bots_workspace_membership_role
    CHECK (
      (
        "${botMemberIdColumnName}" IS NOT NULL
        AND "${roleColumnName}" = '${botRole}'
      )
      OR "${botMemberIdColumnName}" IS NULL
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspaceMembershipsTable(knex);
}

async function dropWorkspaceMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspaceMembershipsTableName);
}
