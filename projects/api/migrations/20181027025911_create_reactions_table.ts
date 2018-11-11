import Knex from 'knex';

import { constants, timestamps } from './helpers';

const reactionsTableName = 'reactions';
const workspacesTableName = 'workspaces';

const nameColumnName = 'name';
const isCustomColumnName = 'isCustom';
const workspaceIdColumnName = 'workspaceId';
const imageUrlColumnName = 'imageUrl';

export async function up(knex: Knex): Promise<void> {
  await createReactionsTable(knex);
  await addNonNullableWorkspaceIdAndImageUrlOnCustomReactionsConstraint(knex);
}

async function createReactionsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(reactionsTableName, table => {
    table
      .increments('id')
      .unsigned()
      .primary();

    table.string(nameColumnName, 64).nullable();

    table
      .boolean(isCustomColumnName)
      .notNullable()
      .defaultTo(false);

    table.string(imageUrlColumnName, 256).nullable();

    table
      .integer(workspaceIdColumnName)
      .unsigned()
      .references('id')
      .inTable(workspacesTableName)
      .onDelete(constants.onDelete.cascade)
      .nullable();

    table.unique([workspaceIdColumnName, nameColumnName]);

    timestamps({ knex, table });
  });
}

export async function addNonNullableWorkspaceIdAndImageUrlOnCustomReactionsConstraint(
  knex: Knex,
): Promise<void> {
  const constraintQuery = `
    ALTER TABLE "${reactionsTableName}"
    ADD CONSTRAINT
      non_nullable_${workspaceIdColumnName}_and_${imageUrlColumnName}_on_custom_reaction
    CHECK (
      ("${isCustomColumnName}" = TRUE
        AND "${workspaceIdColumnName}" IS NOT NULL
        AND "${imageUrlColumnName}" IS NOT NULL)
      OR ("${isCustomColumnName}" = FALSE
        AND "${workspaceIdColumnName}" IS NULL
        AND "${imageUrlColumnName}" IS NULL)
    );
  `;

  await knex.schema.raw(constraintQuery);
}

export async function down(knex: Knex): Promise<void> {
  await dropReactionsTable(knex);
}

async function dropReactionsTable(knex: Knex): Promise<void> {
  await knex.schema.dropTable(reactionsTableName);
}
