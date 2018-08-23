import { Transaction } from 'knex';

export type DBOptions = Readonly<{
  transaction?: Transaction;
}>;
