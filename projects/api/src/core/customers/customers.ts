import { doInTransaction } from '../db';
import stripe from '../stripe';
import { DBOptions } from '../types';
import { getCustomerByUser } from './get';
import { insertCustomer, InsertCustomerArgs } from './insertion';
import { Customer } from './types';

export type GetOrCreateCustomerArgs = CreateCustomerArgs;

export async function getOrCreateCustomer(
  args: GetOrCreateCustomerArgs,
  options: DBOptions = {},
): Promise<Customer> {
  const customer = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { transaction };

    const existingCustomer = await getCustomerByUser(
      args.user,
      optionsWithTransaction,
    );

    if (existingCustomer) {
      return existingCustomer;
    }

    const createdCustomer = await createCustomer(args, optionsWithTransaction);

    return createdCustomer;
  }, options);

  return customer;
}

export type CreateCustomerArgs = InsertCustomerArgs;

export async function createCustomer(
  args: CreateCustomerArgs,
  options: DBOptions = {},
): Promise<Customer> {
  const stripeCustomer = await stripe.customers.create({
    email: args.user.email,
  });

  const insertCustomerArgs: InsertCustomerArgs = {
    user: args.user,
    stripeCustomerId: stripeCustomer.id,
  };

  const insertedCustomer = await insertCustomer(insertCustomerArgs, options);

  return insertedCustomer;
}
