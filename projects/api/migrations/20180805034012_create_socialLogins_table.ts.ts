import Knex from 'knex';

const socialLoginsTableName = 'socialLogins';

export async function up(knex: Knex): Promise<void> {
  await createSocialLoginsTable(knex);
}

async function createSocialLoginsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(socialLoginsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string('uid', 128).notNullable();
    table.string('provider', 16).notNullable();

    table
      .integer('userId')
      .unsigned()
      .notNullable();

    table
      .foreign('userId')
      .references('users.id')
      .onDelete('CASCADE');

    table.unique(['uid', 'provider']);

    table.timestamp('insertedAt', true).defaultTo(knex.fn.now());
    table.timestamp('updatedAt', true).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropSocialLoginsTable(knex);
}

async function dropSocialLoginsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(socialLoginsTableName);
}
