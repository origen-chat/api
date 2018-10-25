import Knex from 'knex';

import { constants, timestamps } from './helpers';

const channelsTableName = 'channels';
const workspacesTableName = 'workspaces';

const nameColumnName = 'name';
const workspaceIdColumnName = 'workspaceId';
const typeColumnName = 'type';

const namedChannelType = 'named';
const directMessagesChannelType = 'directMessages';

export async function up(knex: Knex): Promise<void> {
  await createChannelsTable(knex);
  await createNameUniqueIndex(knex);
  await addNonNullableNameConstraint(knex);
}

async function createChannelsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(channelsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string(nameColumnName, 64);

    table.string(typeColumnName, 32).notNullable();

    table.string('privacy', 32).notNullable();

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .references(`${workspacesTableName}.id`)
      .onDelete(constants.onDelete.cascade)
      .notNullable();

    table.string('topic', 128);
    table.string('purpose', 256);

    table.unique([workspaceIdColumnName, nameColumnName]);

    timestamps({ knex, table });
  });
}

export async function createNameUniqueIndex(knex: Knex): Promise<void> {
  const uniqueIndexQuery = `
    CREATE UNIQUE INDEX ${channelsTableName}_${nameColumnName}_index
    ON "${channelsTableName}" ("${nameColumnName}")
    WHERE "${typeColumnName}" = '${namedChannelType}';
  `;

  await knex.schema.raw(uniqueIndexQuery);
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

export async function down(knex: Knex): Promise<void> {
  await dropChannelsTable(knex);
}

async function dropChannelsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(channelsTableName);
}
