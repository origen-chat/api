import { Transaction } from 'knex';

import db from './db';

export async function beginTransaction(): Promise<Transaction> {
  const transactionPromise = new Promise<Transaction>(resolve =>
    db.transaction(resolve),
  );

  return transactionPromise;
}
