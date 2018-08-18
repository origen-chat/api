import Knex from 'knex';

const channelsTableName = 'channels';

export async function up(knex: Knex): Promise<void> {
  await createChannelsTable(knex);
}

async function createChannelsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(channelsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .string('name', 64)
      .notNullable()
      .unique();

    table
      .integer('workspaceId')
      .unsigned()
      .references('workspaces.id')
      .onDelete('CASCADE')
      .notNullable();

    table.string('topic', 128);

    table.string('purpose', 256);

    table.unique(['workspaceId', 'name']);

    table.timestamp('insertedAt', true).defaultTo(knex.fn.now());
    table.timestamp('updatedAt', true).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropChannelsTable(knex);
}

async function dropChannelsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(channelsTableName);
}
