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
      .references(`${workspaceMembershipsTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .primary()
      .notNullable();

    table.jsonb('configuration').notNullable();

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropUserWorkspaceSettingsTable(knex);
}

async function dropUserWorkspaceSettingsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(userWorkspaceSettingsTableName);
}
