import Knex from 'knex';

import { constants, timestamps } from './helpers';

const bookmarksTableName = 'bookmarks';
const messagesTableName = 'messages';
const usersTableName = 'users';

const messageIdColumnName = 'messageId';
const authorIdColumnName = 'authorId';

export async function up(knex: Knex): Promise<void> {
  await createBookmarksTable(knex);
  await addOnlyOneNonNullBookmarkable(knex);
}

async function createBookmarksTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(bookmarksTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(messageIdColumnName)
      .unsigned()
      .references('id')
      .inTable(messagesTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table
      .integer(authorIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.unique([messageIdColumnName, authorIdColumnName]);

    timestamps({ knex, table });
  });
}

export async function addOnlyOneNonNullBookmarkable(knex: Knex): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${bookmarksTableName}"
    ADD CONSTRAINT only_one_non_null_bookmarkable
    CHECK (
      (
        ("${messageIdColumnName}" IS NOT NULL)::integer
      ) = 1
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropBookmarksTable(knex);
}

async function dropBookmarksTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(bookmarksTableName);
}
