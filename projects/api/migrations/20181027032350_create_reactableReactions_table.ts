import Knex from 'knex';

import { constants, timestamps } from './helpers';

const reactableReactionsTableName = 'reactableReactions';
const reactionsTableName = 'reactions';
const messagesTableName = 'messages';
const usersTableName = 'users';

const reactionIdColumnName = 'reactionId';
const messageIdColumnName = 'messageId';
const authorIdColumnName = 'authorId';

export async function up(knex: Knex): Promise<void> {
  await createReactableReactionsTable(knex);
  await addOnlyOneNonNullReactable(knex);
}

async function createReactableReactionsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(reactableReactionsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(reactionIdColumnName)
      .unsigned()
      .references(`${reactionsTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .integer(messageIdColumnName)
      .unsigned()
      .references(`${messagesTableName}.id`)
      .onDelete(constants.onDelete.cascade);

    table
      .integer(authorIdColumnName)
      .unsigned()
      .references(`${usersTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.unique([
      reactionIdColumnName,
      messageIdColumnName,
      authorIdColumnName,
    ]);

    timestamps({ knex, table });
  });
}

export async function addOnlyOneNonNullReactable(knex: Knex): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${reactableReactionsTableName}"
    ADD CONSTRAINT only_one_non_null_reactable
    CHECK (
      (
        ("${messageIdColumnName}" IS NOT NULL)::integer
      ) = 1
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropReactableReactionsTable(knex);
}

async function dropReactableReactionsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(reactableReactionsTableName);
}
