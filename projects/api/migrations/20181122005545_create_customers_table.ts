import Knex from 'knex';

import { constants, timestamps } from './helpers';

const customersTableName = 'customers';
const usersTableName = 'users';

const stripeCustomerIdColumnName = 'stripeCustomerId';

export async function up(knex: Knex): Promise<void> {
  await createCustomersTable(knex);
}

async function createCustomersTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(customersTableName, table => {
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .primary();

    table
      .string(stripeCustomerIdColumnName, 256)
      .unique()
      .notNullable();

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropCustomersTable(knex);
}

async function dropCustomersTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(customersTableName);
}
