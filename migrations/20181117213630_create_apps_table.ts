import Knex from 'knex';

import { timestamps } from './helpers';

const appsTableName = 'apps';

export async function up(knex: Knex): Promise<void> {
  await createAppsTable(knex);
}

async function createAppsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(appsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string('name', 64).notNullable();

    table
      .boolean('public')
      .notNullable()
      .defaultTo(false);

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropAppsTable(knex);
}

async function dropAppsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(appsTableName);
}
