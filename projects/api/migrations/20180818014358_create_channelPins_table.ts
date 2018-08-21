import Knex from 'knex';

const channelPinsTableName = 'channelPins';

export async function up(knex: Knex): Promise<void> {
  await createChannelPinsTable(knex);
}

async function createChannelPinsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(channelPinsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer('channelId')
      .unsigned()
      .references('channels.id')
      .onDelete('CASCADE')
      .notNullable();

    table
      .integer('messageId')
      .unsigned()
      .references('messages.id')
      .onDelete('CASCADE')
      .notNullable();

    table.timestamp('insertedAt', true).defaultTo(knex.fn.now());
    table.timestamp('updatedAt', true).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropChannelPinsTable(knex);
}

async function dropChannelPinsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(channelPinsTableName);
}
