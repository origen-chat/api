import Knex from 'knex';

import { constants, timestamps } from './helpers';

const loadingMessagesTableName = 'loadingMessages';
const usersTableName = 'users';
const workspacesTableName = 'workspaces';

const authorIdColumnName = 'authorId';
const workspaceIdColumnName = 'workspaceId';

export async function up(knex: Knex): Promise<void> {
  await createLoadingMessagesTable(knex);
  await addCustomLoadingMessageFieldsConstraint(knex);
}

async function createLoadingMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(loadingMessagesTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string('message', 256).notNullable();

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table
      .integer(authorIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    timestamps({ knex, table });
  });
}

async function addCustomLoadingMessageFieldsConstraint(
  knex: Knex,
): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${loadingMessagesTableName}"
    ADD CONSTRAINT custom_loading_message_fields
    CHECK (
      (
        "${workspaceIdColumnName}" IS NOT NULL AND ${authorIdColumnName} IS NOT NULL
      ) OR
      (
        "${workspaceIdColumnName}" IS NULL AND ${authorIdColumnName} IS NULL
      )
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropLoadingMessagesTable(knex);
}

async function dropLoadingMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(loadingMessagesTableName);
}
