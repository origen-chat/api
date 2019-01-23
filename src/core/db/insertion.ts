import * as Knex from 'knex';

import { DBOptions } from '../types';

import { db } from './db';
import { maybeAddTransactionToQuery } from './transactions';

export type InsertIntoDBArgs<TData> = Readonly<{
  tableName: string;
  data: TData;
}>;

export type InsertIntoDBOptions = DBOptions &
  Readonly<{ onConflictDoNothing?: boolean }>;

export async function insertIntoDB<TData extends any | ReadonlyArray<any>>(
  args: InsertIntoDBArgs<TData>,
  options: InsertIntoDBOptions = {},
): Promise<TData extends ReadonlyArray<any> ? ReadonlyArray<any> : any> {
  const query = db
    .insert(args.data)
    .into(args.tableName)
    .returning('*');

  const queryWithMaybeOnConflict = maybeAddOnConflict(query, options);
  maybeAddTransactionToQuery(queryWithMaybeOnConflict as any, options);

  const rows = await queryWithMaybeOnConflict;

  if (Array.isArray(args.data)) {
    return rows;
  }

  const [firstRow] = rows;

  return firstRow;
}

function maybeAddOnConflict(
  query: Knex.QueryBuilder,
  options: InsertIntoDBOptions,
): Knex.QueryBuilder | Knex.Raw {
  let updatedQuery: Knex.QueryBuilder | Knex.Raw;

  if (options.onConflictDoNothing) {
    const { bindings, sql } = query.toSQL();

    const updatedSQL = `${sql} ON CONFLICT DO NOTHING`;

    updatedQuery = db.raw(updatedSQL, bindings);
  } else {
    updatedQuery = query;
  }

  return updatedQuery;
}
