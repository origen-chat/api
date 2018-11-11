import Knex from 'knex';

import { constants, timestamps } from './helpers';

const channelsTableName = 'channels';
const workspacesTableName = 'workspaces';

const nameColumnName = 'name';
const workspaceIdColumnName = 'workspaceId';
const typeColumnName = 'type';
const isDefaultColumnName = 'isDefault';

const namedChannelType = 'named';
const directMessagesChannelType = 'directMessages';

export async function up(knex: Knex): Promise<void> {
  await createChannelsTable(knex);
  await createUniqueNameIndex(knex);
  await createUniqueDefaultChannelIndex(knex);
  await addNonNullableNameConstraint(knex);
  await addNonDefaultDirectMessagesChannelConstraint(knex);
}

async function createChannelsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(channelsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string(nameColumnName, 64).nullable();

    table.string(typeColumnName, 32).notNullable();

    table
      .boolean(isDefaultColumnName)
      .notNullable()
      .defaultTo(false);

    table.string('privacy', 32).notNullable();

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.string('topic', 128).nullable();
    table.string('purpose', 256).nullable();

    table.unique([workspaceIdColumnName, nameColumnName]);

    timestamps({ knex, table });
  });
}

export async function createUniqueNameIndex(knex: Knex): Promise<void> {
  const uniqueIndexQuery = `
    CREATE UNIQUE INDEX ${channelsTableName}_${nameColumnName}_index
    ON "${channelsTableName}" ("${nameColumnName}")
    WHERE "${typeColumnName}" = '${namedChannelType}';
  `;

  await knex.schema.raw(uniqueIndexQuery);
}

export async function createUniqueDefaultChannelIndex(
  knex: Knex,
): Promise<void> {
  const uniqueDefaultChannelIndexQuery = `
    CREATE UNIQUE INDEX ${channelsTableName}_default_channel_index
    ON "${channelsTableName}" ("${workspaceIdColumnName}", "${isDefaultColumnName}")
    WHERE "${isDefaultColumnName}" = TRUE;
  `;

  await knex.schema.raw(uniqueDefaultChannelIndexQuery);
}

export async function addNonNullableNameConstraint(knex: Knex): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${channelsTableName}"
    ADD CONSTRAINT non_nullable_${nameColumnName}_on_named_channel
    CHECK (
      ("${nameColumnName}" IS NOT NULL AND "${typeColumnName}" = '${namedChannelType}')
      OR ("${nameColumnName}" IS NULL AND "${typeColumnName}" = '${directMessagesChannelType}')
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function addNonDefaultDirectMessagesChannelConstraint(
  knex: Knex,
): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${channelsTableName}"
    ADD CONSTRAINT non_default_direct_messages_channel
    CHECK (
      ("${typeColumnName}" = '${directMessagesChannelType}' AND "${isDefaultColumnName}" = FALSE)
      OR ("${typeColumnName}" <> '${directMessagesChannelType}')
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropChannelsTable(knex);
}

async function dropChannelsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(channelsTableName);
}
