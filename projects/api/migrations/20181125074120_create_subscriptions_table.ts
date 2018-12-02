import Knex from 'knex';

import { constants, timestamps } from './helpers';

const subscriptionsTableName = 'subscriptions';
const customersTableName = 'customers';
const plansTableName = 'plans';
const workspacesTableName = 'workspaces';

const customerIdColumnName = 'customerId';
const planIdColumnName = 'planId';
const workspaceIdColumnName = 'workspaceId';
const stripeSubscriptionDataColumnName = 'stripeSubscriptionData';

const stripeSubscriptionIdFieldName = 'id';

export async function up(knex: Knex): Promise<void> {
  await createSubscriptionsTable(knex);
  await createUniqueStripeSubscriptionIdIndex(knex);
}

async function createSubscriptionsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(subscriptionsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(customerIdColumnName)
      .unsigned()
      .references('id')
      .inTable(customersTableName)
      .onDelete(constants.onDelete.restrict)
      .notNullable();

    table
      .integer(planIdColumnName)
      .unsigned()
      .references('id')
      .inTable(plansTableName)
      .onDelete(constants.onDelete.restrict)
      .notNullable();

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.restrict)
      .unique()
      .notNullable();

    table.jsonb(stripeSubscriptionDataColumnName).notNullable();

    timestamps({ knex, table });
  });
}

async function createUniqueStripeSubscriptionIdIndex(
  knex: Knex,
): Promise<void> {
  const uniqueIndexQuery = `
    CREATE UNIQUE INDEX
      ${subscriptionsTableName}_${stripeSubscriptionDataColumnName}_${stripeSubscriptionIdFieldName}_index
    ON "${subscriptionsTableName}"
      (("${stripeSubscriptionDataColumnName}"->'${stripeSubscriptionIdFieldName}'));
  `;

  await knex.schema.raw(uniqueIndexQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropSubscriptionsTable(knex);
}

async function dropSubscriptionsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(subscriptionsTableName);
}
