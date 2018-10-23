import Knex from 'knex';

import { timestamps } from './helpers';

const workspacesTableName = 'workspaces';

export async function up(knex: Knex): Promise<void> {
  await createWorkspacesTable(knex);
}

async function createWorkspacesTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(workspacesTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .string('name', 64)
      .notNullable()
      .unique();

    table.string('displayName', 64).notNullable();

    table.string('description', 256);

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspacesTable(knex);
}

async function dropWorkspacesTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspacesTableName);
}
