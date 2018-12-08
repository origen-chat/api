import Knex from 'knex';

import { constants, timestamps } from './helpers';

const userWorkspaceSettingsTableName = 'userWorkspaceSettings';
const workspaceMembershipsTableName = 'workspaceMemberships';
const workspaceMembershipIdColumnName = 'workspaceMembershipId';

export async function up(knex: Knex): Promise<void> {
  await createUserWorkspaceSettingsTable(knex);
}

async function createUserWorkspaceSettingsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(userWorkspaceSettingsTableName, table => {
    table
      .integer(workspaceMembershipIdColumnName)
      .unsigned()
      .references('id')
      .inTable(workspaceMembershipsTableName)
      .onDelete(constants.onDelete.cascade)
      .primary();

    table
      .time('doNotDisturbFrom')
      .notNullable()
      .defaultTo('20:00:00');

    table
      .time('doNotDisturbTo')
      .notNullable()
      .defaultTo('08:00:00');

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropUserWorkspaceSettingsTable(knex);
}

async function dropUserWorkspaceSettingsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(userWorkspaceSettingsTableName);
}
