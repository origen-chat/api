import Knex from 'knex';

const workspaceMembershipsTableName = 'workspaceMemberships';

export async function up(knex: Knex): Promise<void> {
  await createWorkspaceMembershipsTable(knex);
}

async function createWorkspaceMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(workspaceMembershipsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer('memberId')
      .unsigned()
      .notNullable();

    table
      .foreign('memberId')
      .references('users.id')
      .onDelete('CASCADE');

    table
      .integer('workspaceId')
      .unsigned()
      .notNullable();

    table
      .foreign('workspaceId')
      .references('workspaces.id')
      .onDelete('CASCADE');

    table.string('role', 32).notNullable();

    table.unique(['memberId', 'workspaceId']);

    table.timestamp('insertedAt', true).defaultTo(knex.fn.now());
    table.timestamp('updatedAt', true).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropWorkspaceMembershipsTable(knex);
}

async function dropWorkspaceMembershipsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(workspaceMembershipsTableName);
}
