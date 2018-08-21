import Knex from 'knex';

const messagesTableName = 'messages';

export async function up(knex: Knex): Promise<void> {
  await createMessagesTable(knex);
}

async function createMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(messagesTableName, table => {
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
      .integer('senderId')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .notNullable();

    table
      .integer('parentMessageId')
      .unsigned()
      .references(`${messagesTableName}.id`)
      .onDelete('CASCADE');

    table.jsonb('content').notNullable();

    table.timestamp('insertedAt', true).defaultTo(knex.fn.now());
    table.timestamp('updatedAt', true).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropMessagesTable(knex);
}

async function dropMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(messagesTableName);
}
