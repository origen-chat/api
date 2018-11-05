import db, { maybeAddTransactionToQuery } from '../db';
import { Customer } from '../payments';
import { DBOptions, Nullable } from '../types';
import { User } from '../users';
import { customersTableName } from './constants';

export async function getCustomerByUser(
  user: User,
  options: DBOptions = {},
): Promise<Nullable<Customer>> {
  const customer = await getCustomerBy({ user }, options);

  return customer;
}

type GetCustomerByArgs = Readonly<{
  user: User;
}>;

async function getCustomerBy(
  args: GetCustomerByArgs,
  options: DBOptions = {},
): Promise<Nullable<Customer>> {
  const query = db
    .select('*')
    .from(customersTableName)
    .first();

  if ((args as any).user) {
    query.where({ userId: (args as any).user.id });
  }

  maybeAddTransactionToQuery(query, options);

  const customer: Nullable<Customer> = await query;

  return customer;
}
