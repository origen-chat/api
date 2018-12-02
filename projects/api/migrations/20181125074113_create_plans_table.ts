import Knex from 'knex';

import { timestamps } from './helpers';

const plansTableName = 'plans';

const stripePlanDataColumnName = 'stripePlanData';

const stripePlanIdFieldName = 'id';

export async function up(knex: Knex): Promise<void> {
  await createPlansTable(knex);
  await createUniqueStripePlanIdIndex(knex);
}

async function createPlansTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(plansTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string('description', 512).nullable();

    table.jsonb(stripePlanDataColumnName).notNullable();

    timestamps({ knex, table });
  });
}

async function createUniqueStripePlanIdIndex(knex: Knex): Promise<void> {
  const uniqueIndexQuery = `
    CREATE UNIQUE INDEX
      ${plansTableName}_${stripePlanDataColumnName}_${stripePlanIdFieldName}_index
    ON "${plansTableName}"
      (("${stripePlanDataColumnName}"->'${stripePlanIdFieldName}'));
  `;

  await knex.schema.raw(uniqueIndexQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropPlansTable(knex);
}

async function dropPlansTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(plansTableName);
}
