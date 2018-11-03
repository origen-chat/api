import Knex, { CreateTableBuilder } from 'knex';

export type TimestampsArgs = Readonly<{
  knex: Knex;
  table: CreateTableBuilder;
  insertedAt?: boolean;
  updatedAt?: boolean;
}>;

export function timestamps({
  knex,
  table,
  insertedAt = true,
  updatedAt = true,
}: TimestampsArgs): void {
  if (insertedAt) {
    timestamp({ knex, table, columnName: 'insertedAt' });
  }

  if (updatedAt) {
    timestamp({ knex, table, columnName: 'updatedAt' });
  }
}

type TimestampArgs = Pick<TimestampsArgs, 'knex' | 'table'> &
  Readonly<{ columnName: string }>;

function timestamp({ knex, table, columnName }: TimestampArgs): void {
  table
    .timestamp(columnName, true)
    .notNullable()
    .defaultTo(knex.fn.now());
}
