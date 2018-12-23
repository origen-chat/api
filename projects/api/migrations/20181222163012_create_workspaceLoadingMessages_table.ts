import Knex from 'knex';

import { constants, timestamps } from './helpers';

const workspaceLoadingMessagesTableName = 'workspaceLoadingMessages';
const workspacesTableName = 'workspaces';
const loadingMessagesTable = 'loadingMessages';

const workspaceIdColumnName = 'workspaceId';
const loadingMessageIdColumnName = 'loadingMessageId';

export async function up(knex: Knex): Promise<void> {
  await createWorkspaceLoadingMessagesTable(knex);
}

async function createWorkspaceLoadingMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(workspaceLoadingMessagesTableName, table => {
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

    table
      .integer(loadingMessageIdColumnName)
      .unsigned()
      .references('id')
      .inTable(loadingMessagesTable)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .boolean('enabled')
      .notNullable()
      .defaultTo(true);

    table.unique([workspaceIdColumnName, loadingMessageIdColumnName]);

    timestamps({ knex, table, updatedAt: false });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspaceLoadingMessagesTable(knex);
}

async function dropWorkspaceLoadingMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspaceLoadingMessagesTableName);
}
