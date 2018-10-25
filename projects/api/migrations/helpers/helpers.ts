import Knex, { CreateTableBuilder } from 'knex';

export type TimestampsArgs = Readonly<{
  knex: Knex;
  table: CreateTableBuilder;
}>;

export function timestamps({ knex, table }: TimestampsArgs): void {
  timestamp({ knex, table, columnName: 'insertedAt' });
  timestamp({ knex, table, columnName: 'updatedAt' });
}

type TimestampArgs = Pick<TimestampsArgs, 'knex' | 'table'> &
  Readonly<{ columnName: string }>;

function timestamp({ knex, table, columnName }: TimestampArgs): void {
  table
    .timestamp(columnName, true)
    .notNullable()
    .defaultTo(knex.fn.now());
}
