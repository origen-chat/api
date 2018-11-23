import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID, Nullable } from '../types';
import { User } from '../users';
import { customersTableName } from './constants';
import { Customer } from './types';

export async function getCustomerByUserAndCurrency(
  user: User,
  currency: string,
  options: DBOptions = {},
): Promise<Nullable<Customer>> {
  const customer = await getCustomerBy({ user, currency }, options);

  return customer;
}

export async function getCustomerById(
  id: ID,
  options: DBOptions = {},
): Promise<Nullable<Customer>> {
  const customer = await getCustomerBy({ id }, options);

  return customer;
}

type GetCustomerByArgs =
  | (Readonly<{
      user: User;
    }> &
      Pick<Customer, 'currency'>)
  | Pick<Customer, 'id'>
  | Pick<Customer, 'stripeCustomerId'>;

async function getCustomerBy(
  args: GetCustomerByArgs,
  options: DBOptions = {},
): Promise<Nullable<Customer>> {
  const query = db
    .select('*')
    .from(customersTableName)
    .first();

  if ((args as any).user && (args as any).currency) {
    query.where({
      userId: (args as any).user.id,
      currency: (args as any).currency,
    });
  } else if ((args as any).id) {
    query.where({
      id: (args as any).id,
    });
  } else if ((args as any).stripeCustomerId) {
    query.where({
      stripeCustomerId: (args as any).stripeCustomerId,
    });
  }

  maybeAddTransactionToQuery(query, options);

  const customer: Nullable<Customer> = await query;

  return customer;
}
