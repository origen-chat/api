import { Transaction } from 'knex';

import db from './db';

export type TransactFunction<TReturn> = (
  transaction: Transaction,
) => TReturn | Promise<TReturn>;

export async function transact<TReturn>(
  transactFunction: TransactFunction<TReturn>,
): Promise<TReturn> {
  const transaction = await beginTransaction();

  try {
    const value = await transactFunction(transaction);

    await transaction.commit();

    return value;
  } catch (error) {
    await transaction.rollback();

    throw error;
  }
}

export async function beginTransaction(): Promise<Transaction> {
  const transactionPromise = new Promise<Transaction>(resolve =>
    db.transaction(resolve),
  );

  return transactionPromise;
}
