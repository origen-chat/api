import Knex from 'knex';

import { constants, timestamps } from './helpers';

const colorThemesTableName = 'colorThemes';
const usersTableName = 'users';

const authorIdColumnName = 'authorId';

export async function up(knex: Knex): Promise<void> {
  await createColorThemesTable(knex);
  await populateNativeColorThemes(knex);
}

async function createColorThemesTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(colorThemesTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .string('name', 64)
      .notNullable()
      .unique();

    table
      .integer(authorIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table.jsonb('colors').nullable();

    timestamps({ knex, table });
  });
}

async function populateNativeColorThemes(knex: Knex): Promise<void> {
  const colorThemes = [
    {
      name: 'default',
      authorId: null,
      colors: null,
    },
  ];

  await knex.insert(colorThemes).into(colorThemesTableName);
}

export async function down(knex: Knex): Promise<void> {
  await dropColorThemesTable(knex);
}

async function dropColorThemesTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(colorThemesTableName);
}
