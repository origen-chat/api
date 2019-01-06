import Knex from 'knex';

import { constants, timestamps } from './helpers';

const workspaceInvitationLinksTableName = 'workspaceInvitationLinks';
const workspacesTableName = 'workspaces';

const workspaceIdColumnName = 'workspaceId';
const deactivatedAtColumnName = 'deactivatedAt';
const expiresAtColumnName = 'expiresAt';

export async function up(knex: Knex): Promise<void> {
  await createWorkspaceInvitationLinksTable(knex);
  await addWorkspaceInvitationLinkFieldsConstraint(knex);
}

async function createWorkspaceInvitationLinksTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(workspaceInvitationLinksTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string('code', 512).notNullable();

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.timestamp(deactivatedAtColumnName).nullable();

    table.timestamp(expiresAtColumnName).nullable();

    timestamps({ knex, table });
  });
}

async function addWorkspaceInvitationLinkFieldsConstraint(
  knex: Knex,
): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${workspaceInvitationLinksTableName}"
    ADD CONSTRAINT workspace_invitation_link_fields
    CHECK (
      (
        "${deactivatedAtColumnName}" IS NOT NULL AND
        "${expiresAtColumnName}" IS NOT NULL AND
        "${deactivatedAtColumnName}" <= "${expiresAtColumnName}"
      ) OR
      "${deactivatedAtColumnName}" IS NULL OR
      "${expiresAtColumnName}" IS NULL
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspaceInvitationLinksTable(knex);
}

async function dropWorkspaceInvitationLinksTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspaceInvitationLinksTableName);
}
