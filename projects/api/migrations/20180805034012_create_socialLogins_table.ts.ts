import Knex from 'knex';

import { constants, timestamps } from './helpers';

const socialLoginsTableName = 'socialLogins';
const usersTableName = 'users';

const providerUserIdColumnName = 'providerUserId';
const providerColumnName = 'provider';

export async function up(knex: Knex): Promise<void> {
  await createSocialLoginsTable(knex);
}

async function createSocialLoginsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(socialLoginsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string(providerUserIdColumnName, 128).notNullable();
    table.string(providerColumnName, 16).notNullable();

    table
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade);

    table.unique([providerUserIdColumnName, providerColumnName]);

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropSocialLoginsTable(knex);
}

async function dropSocialLoginsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(socialLoginsTableName);
}
