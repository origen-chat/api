import { QueryBuilder, Raw, Transaction } from 'knex';

import { DBOptions } from '../types';
import db from './db';

export type TransactionFunction<TReturn> = (
  transaction: Transaction,
) => Promise<TReturn>;

export type TransactOptions = TransactionFromBeforeArg;

export async function doInTransaction<TReturn>(
  transactFunction: TransactionFunction<TReturn>,
  options: TransactOptions = {},
): Promise<TReturn> {
  if (options.transactionFromBefore) {
    return transactFunction(options.transactionFromBefore);
  }

  const value = await db.transaction(transactFunction);

  return value;
}

type TransactionFromBeforeArg = Readonly<{
  transactionFromBefore?: Transaction;
}>;

export function maybeAddTransactionToQuery(
  query: QueryBuilder,
  options: DBOptions,
): QueryBuilder;

export function maybeAddTransactionToQuery(query: Raw, options: DBOptions): Raw;

export function maybeAddTransactionToQuery(
  query: QueryBuilder | Raw,
  options: DBOptions,
): QueryBuilder | Raw {
  if (options.transaction) {
    query.transacting(options.transaction);
  }

  return query;
}
