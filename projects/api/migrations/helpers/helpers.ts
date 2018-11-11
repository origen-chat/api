import Knex, { CreateTableBuilder } from 'knex';

export type TimestampsArgs = Pick<TimestampArgs, 'knex' | 'table'> &
  Readonly<{
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
    timestamp({ knex, table, columnName: 'updatedAt', nullable: true });
  }
}

type TimestampArgs = Readonly<{
  knex: Knex;
  table: CreateTableBuilder;
  columnName: string;
  nullable?: boolean;
}>;

function timestamp({ knex, table, columnName, nullable }: TimestampArgs): void {
  const column = table.timestamp(columnName, false);

  if (!nullable) {
    column.notNullable().defaultTo(knex.fn.now());
  } else {
    column.nullable();
  }
}
