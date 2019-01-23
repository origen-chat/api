import * as Knex from 'knex';

import { DBOptions } from '../types';

import { db } from './db';

export type TransactionFunction<TReturn> = (
  transaction: Knex.Transaction,
) => Promise<TReturn>;

export type DoInTransactionOptions = DBOptions;

export async function doInTransaction<TReturn>(
  transactFunction: TransactionFunction<TReturn>,
  options: DoInTransactionOptions = {},
): Promise<TReturn> {
  if (options.transaction) {
    return transactFunction(options.transaction);
  }

  const value = await db.transaction(transactFunction);

  return value;
}

export function maybeAddTransactionToQuery(
  query: Knex.QueryBuilder,
  options: DBOptions,
): Knex.QueryBuilder;

export function maybeAddTransactionToQuery(
  query: Knex.Raw,
  options: DBOptions,
): Knex.Raw;

export function maybeAddTransactionToQuery(
  query: Knex.QueryBuilder | Knex.Raw,
  options: DBOptions,
): Knex.QueryBuilder | Knex.Raw {
  if (options.transaction) {
    query.transacting(options.transaction);
  }

  return query;
}
