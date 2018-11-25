import Knex from 'knex';

import { constants, timestamps } from './helpers';

const customersTableName = 'customers';
const usersTableName = 'users';

const stripeCustomerDataColumnName = 'stripeCustomerData';
const userIdColumnName = 'userId';

const stripeCustomerIdFieldName = 'id';

export async function up(knex: Knex): Promise<void> {
  await createCustomersTable(knex);
  await createUniqueStripeCustomerIdIndex(knex);
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

    table.jsonb(stripeCustomerDataColumnName).notNullable();

    timestamps({ knex, table });
  });
}

async function createUniqueStripeCustomerIdIndex(knex: Knex): Promise<void> {
  const uniqueIndexQuery = `
    CREATE UNIQUE INDEX
      ${customersTableName}_${stripeCustomerDataColumnName}_${stripeCustomerIdFieldName}_index
    ON "${customersTableName}" ("${stripeCustomerDataColumnName}"->'${stripeCustomerIdFieldName}');
  `;

  await knex.schema.raw(uniqueIndexQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropCustomersTable(knex);
}

async function dropCustomersTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(customersTableName);
}
