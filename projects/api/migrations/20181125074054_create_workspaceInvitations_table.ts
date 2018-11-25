import Knex from 'knex';

import { constants, timestamps } from './helpers';

const workspaceInvitationsTableName = 'workspaceInvitations';
const workspacesTableName = 'workspaces';
const usersTableName = 'users';

const workspaceIdColumnName = 'workspaceId';
const inviteeIdColumnName = 'inviteeId';
const inviteeEmailColumnName = 'inviteeEmail';

export async function up(knex: Knex): Promise<void> {
  await createWorkspaceInvitationsTable(knex);
  await addOnlyOneNonNullReactableContraint(knex);
}

async function createWorkspaceInvitationsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(workspaceInvitationsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.string('role', 64).notNullable();

    table
      .integer('inviterId')
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.setNull)
      .notNullable();

    table.string('status', 64).notNullable();

    table
      .integer(inviteeIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table.string(inviteeEmailColumnName, 256).nullable();

    timestamps({ knex, table });
  });
}

export async function addOnlyOneNonNullReactableContraint(
  knex: Knex,
): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${workspaceInvitationsTableName}"
    ADD CONSTRAINT only_one_non_null_invitee_field
    CHECK (
      (
        ("${inviteeIdColumnName}" IS NOT NULL)::integer +
        ("${inviteeEmailColumnName}" IS NOT NULL)::integer
      ) = 1
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspaceInvitationsTable(knex);
}

async function dropWorkspaceInvitationsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspaceInvitationsTableName);
}
