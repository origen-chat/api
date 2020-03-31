import { Transaction } from 'postre';

export type DBOptions = Readonly<{
  transaction?: Transaction<any>;
}>;
