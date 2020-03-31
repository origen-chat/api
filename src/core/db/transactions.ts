import { Pool, Transaction, PoolClient } from 'postre';

import { DBOptions } from '../types';

import { db } from './db';

export function maybeUseTransaction(
  options: DBOptions,
): Pool | Transaction<PoolClient> {
  if (options.transaction) {
    return options.transaction;
  }

  return db;
}
