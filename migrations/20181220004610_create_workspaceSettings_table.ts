import Knex from 'knex';

import { constants, timestamps } from './helpers';

const workspaceSettingsTableName = 'workspaceSettings';
const workspacesTableName = 'workspaces';

const workspaceIdColumnName = 'workspaceId';

export async function up(knex: Knex): Promise<void> {
  await createWorkspaceSettingsTable(knex);
}

async function createWorkspaceSettingsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(workspaceSettingsTableName, table => {
    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.cascade)
      .primary();

    table
      .string('locale', 16)
      .notNullable()
      .defaultTo('en');

    table
      .boolean('requireTwoFactorAuthentication')
      .notNullable()
      .defaultTo(false);

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspaceSettingsTable(knex);
}

async function dropWorkspaceSettingsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspaceSettingsTableName);
}
