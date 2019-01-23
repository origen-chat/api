import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID, Nullable } from '../types';
import { User } from '../users';

import { customersTableName } from './constants';
import { Customer } from './types';

export async function getCustomerByUser(
  user: User,
  options: DBOptions = {},
): Promise<Customer | null> {
  const customer = await getCustomerByFromDB({ user }, options);

  return customer;
}

type GetCustomerByFromDBArgs =
  | Readonly<{
      user: User;
      id?: undefined;
      stripeCustomerId?: undefined;
    }>
  | Pick<Customer, 'id'> &
      Readonly<{ user?: undefined; stripeCustomerId?: undefined }>
  | Readonly<{ stripeCustomerId: string; user?: undefined; id?: undefined }>;

async function getCustomerByFromDB(
  args: GetCustomerByFromDBArgs,
  options: DBOptions = {},
): Promise<Customer | null> {
  const query = db
    .select('*')
    .from(customersTableName)
    .first();

  if (args.user) {
    query.where({
      userId: args.user.id,
    });
  } else if (args.id) {
    query.where({
      id: args.id,
    });
  } else if (args.stripeCustomerId) {
    query.whereRaw("stripeCustomerData->'id' = ?", [args.stripeCustomerId]);
  }

  maybeAddTransactionToQuery(query, options);

  const customer: Nullable<Customer> = await query;

  return customer;
}

export async function getCustomerById(
  id: ID,
  options: DBOptions = {},
): Promise<Customer | null> {
  const customer = await getCustomerByFromDB({ id }, options);

  return customer;
}

export async function getCustomerByStripeCustomerId(
  stripeCustomerId: string,
  options: DBOptions = {},
): Promise<Customer | null> {
  const customer = await getCustomerByFromDB({ stripeCustomerId }, options);

  return customer;
}
