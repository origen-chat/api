import Knex from 'knex';

import { constants, timestamps } from './helpers';

const messagesTableName = 'messages';
const channelsTableName = 'channels';
const usersTableName = 'users';
const botsTableName = 'bots';

const channelIdColumnName = 'channelId';
const userSenderIdColumnName = 'userSenderId';
const botSenderIdColumnName = 'botSenderId';

export async function up(knex: Knex): Promise<void> {
  await createMessagesTable(knex);
  await addOnlyOneNonNullSenderConstraint(knex);
}

async function createMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(messagesTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table
      .integer(channelIdColumnName)
      .unsigned()
      .references('id')
      .inTable(channelsTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table
      .integer(userSenderIdColumnName)
      .unsigned()
      .references('id')
      .inTable(usersTableName)
      .onDelete(constants.onDelete.cascade);

    table
      .integer(botSenderIdColumnName)
      .unsigned()
      .references('id')
      .inTable(botsTableName)
      .onDelete(constants.onDelete.cascade);

    table
      .integer('parentMessageId')
      .unsigned()
      .references('id')
      .inTable(messagesTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table.jsonb('content').notNullable();

    timestamps({ knex, table });
  });
}

async function addOnlyOneNonNullSenderConstraint(knex: Knex): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${messagesTableName}"
    ADD CONSTRAINT only_one_non_null_sender
    CHECK (
      (
        ("${userSenderIdColumnName}" IS NOT NULL)::integer
        + ("${botSenderIdColumnName}" IS NOT NULL)::integer
      ) = 1
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropMessagesTable(knex);
}

async function dropMessagesTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(messagesTableName);
}
