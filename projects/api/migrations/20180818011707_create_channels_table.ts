import Knex from 'knex';

const channelsTableName = 'channels';
const nameColumnName = 'name';

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

    table.string('type', 32).notNullable();

    table
      .integer('workspaceId')
      .unsigned()
      .references('workspaces.id')
      .onDelete('CASCADE')
      .notNullable();

    table.string('topic', 128);

    table.string('purpose', 256);

    table.unique(['workspaceId', 'name']);

    table.timestamp('insertedAt', true).defaultTo(knex.fn.now());
    table.timestamp('updatedAt', true).defaultTo(knex.fn.now());
  });
}

export async function createNameUniqueIndex(knex: Knex): Promise<void> {
  const uniqueIndexQuery = `
    CREATE UNIQUE INDEX channels_${nameColumnName}_index
    ON ${channelsTableName} (${nameColumnName})
    WHERE type = 'named';
  `;

  await knex.schema.raw(uniqueIndexQuery);
}

export async function addNonNullableNameConstraint(knex: Knex): Promise<void> {
  const constraintQuery = `
    ALTER TABLE ${channelsTableName}
    ADD CONSTRAINT non_nullable_${nameColumnName}_on_named_channel
    CHECK (
      (${nameColumnName} IS NOT NULL AND type = 'named') OR
      (${nameColumnName} IS NULL AND type = 'directMessages')
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
