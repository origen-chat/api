import { Transaction } from 'knex';

export type DBOptions = Readonly<{
  transaction?: Transaction;
}>;

export enum ComparisonOperator {
  GreatherThan = '>',
  GreatherThanOrEqual = '>=',
  LessThan = '<',
  LessThanOrEqual = '<=',
  Equal = '=',
}

export enum OrderByDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
