import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { customersTableName } from './constants';
import { Customer } from './types';

export type InsertCustomerArgs = Readonly<{
  user: User;
  currency: string;
  stripeCustomerId: string;
}>;

/**
 * Inserts a customer.
 */
export async function insertCustomer(
  args: InsertCustomerArgs,
  options: DBOptions = {},
): Promise<Customer> {
  const doInsertCustomerArgs = makeDoInsertCustomerArgs(args);

  const customer = await doInsertCustomer(doInsertCustomerArgs, options);

  return customer;
}

function makeDoInsertCustomerArgs(
  args: InsertCustomerArgs,
): DoInsertCustomerArgs {
  const doInsertCustomerArgs: DoInsertCustomerArgs = {
    userId: args.user.id,
    currency: args.currency,
    stripeCustomerId: args.stripeCustomerId,
  };

  return doInsertCustomerArgs;
}

type DoInsertCustomerArgs = Pick<
  Customer,
  'userId' | 'currency' | 'stripeCustomerId'
>;

async function doInsertCustomer(
  args: DoInsertCustomerArgs,
  options: DBOptions = {},
): Promise<Customer> {
  const query = db.insert(args).into(customersTableName);

  maybeAddTransactionToQuery(query, options);

  const [customer] = await query;

  return customer;
}
