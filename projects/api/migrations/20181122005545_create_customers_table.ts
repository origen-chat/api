import Knex from 'knex';

import { constants, timestamps } from './helpers';

const customersTableName = 'customers';
const usersTableName = 'users';

const stripeCustomerIdColumnName = 'stripeCustomerId';
const userIdColumnName = 'userId';
const currencyColumnName = 'currency';

export async function up(knex: Knex): Promise<void> {
  await createCustomersTable(knex);
}

async function createCustomersTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(customersTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(userIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.string(currencyColumnName, 64).notNullable();

    table
      .string(stripeCustomerIdColumnName, 256)
      .unique()
      .notNullable();

    table.unique([userIdColumnName, currencyColumnName]);

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropCustomersTable(knex);
}

async function dropCustomersTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(customersTableName);
}
