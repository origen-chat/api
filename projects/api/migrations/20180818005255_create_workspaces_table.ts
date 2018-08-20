import Knex from 'knex';

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

    table.string('description', 256);

    table.timestamp('insertedAt', true).defaultTo(knex.fn.now());
    table.timestamp('updatedAt', true).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspacesTable(knex);
}

async function dropWorkspacesTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspacesTableName);
}
