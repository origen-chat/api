import Knex from 'knex';

import { timestamps } from './helpers';

const usersTableName = 'users';

export async function up(knex: Knex): Promise<void> {
  await createUsersTable(knex);
}

async function createUsersTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(usersTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string('username', 64).notNullable();
    table.string('usernameIdentifier', 8).notNullable();

    table
      .string('email', 256)
      .notNullable()
      .unique();

    table.string('unverifiedEmail', 256).nullable();

    table.string('firstName', 64).nullable();
    table.string('lastName', 64).nullable();

    table.string('bio', 512).nullable();
    table.string('avatarUrl', 128).nullable();

    table.unique(['username', 'usernameIdentifier']);

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropUsersTable(knex);
}

async function dropUsersTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(usersTableName);
}
