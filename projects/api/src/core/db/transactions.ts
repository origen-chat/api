import { QueryBuilder, Raw, Transaction } from 'knex';

import { DBOptions } from '../types';
import db from './db';

export type TransactFunction<TReturn> = (
  transaction: Transaction,
) => TReturn | Promise<TReturn>;

export type TransactOptions = TransactionFromBeforeArg;

export async function transact<TReturn>(
  transactFunction: TransactFunction<TReturn>,
  options: TransactOptions = {},
): Promise<TReturn> {
  const transaction = await beginTransaction({
    transactionFromBefore: options.transactionFromBefore,
  });

  try {
    const value = await transactFunction(transaction);

    await commitTransaction({
      transaction,
      transactionFromBefore: options.transactionFromBefore,
    });

    return value;
  } catch (error) {
    await rollbackTransaction({
      transaction,
      transactionFromBefore: options.transactionFromBefore,
    });

    throw error;
  }
}

export type BeginTransactionArgs = TransactionFromBeforeArg;

export async function beginTransaction(
  args: BeginTransactionArgs = {},
): Promise<Transaction> {
  if (args.transactionFromBefore) {
    return args.transactionFromBefore;
  }

  const transactionPromise = new Promise<Transaction>(resolve =>
    db.transaction(transaction => {
      resolve(transaction);
    }),
  );

  return transactionPromise;
}

export type CommitTransactionArgs = TransactionArg & TransactionFromBeforeArg;

export async function commitTransaction(
  args: CommitTransactionArgs,
): Promise<void> {
  if (args.transactionFromBefore) {
    return;
  }

  await args.transaction.commit();
}

type TransactionArg = Readonly<{ transaction: Transaction }>;

type TransactionFromBeforeArg = Readonly<{
  transactionFromBefore?: Transaction;
}>;

export type RollbackTransactionArgs = TransactionArg & TransactionFromBeforeArg;

export async function rollbackTransaction(
  args: RollbackTransactionArgs,
): Promise<void> {
  if (args.transactionFromBefore) {
    return;
  }

  await args.transaction.rollback();
}

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
