import Knex from 'knex';

import { constants, timestamps } from './helpers';

const userSettingsTableName = 'userSettings';
const usersTableName = 'users';
const colorThemesTableName = 'colorThemes';

const userIdColumnName = 'userId';
const colorThemeIdColumnName = 'colorThemeId';

export async function up(knex: Knex): Promise<void> {
  await createUserSettingsTable(knex);
}

async function createUserSettingsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(userSettingsTableName, table => {
    table
      .integer(userIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .primary();

    table
      .string('locale', 16)
      .notNullable()
      .defaultTo('en');

    table.string('timezone', 128).nullable();

    table
      .integer(colorThemeIdColumnName)
      .unsigned()
      .references('id')
      .inTable(colorThemesTableName)
      .onDelete(constants.onDelete.restrict)
      .nullable();

    timestamps({ knex, table });
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropUserSettingsTable(knex);
}

async function dropUserSettingsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(userSettingsTableName);
}
