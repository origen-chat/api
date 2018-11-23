import { doInTransaction } from '../db';
import stripe from '../stripe';
import { DBOptions } from '../types';
import { getCustomerByUserAndCurrency } from './get';
import { insertCustomer, InsertCustomerArgs } from './insertion';
import { Customer } from './types';

export type GetOrCreateCustomerArgs = CreateCustomerArgs;

export async function getOrCreateCustomer(
  args: GetOrCreateCustomerArgs,
  options: DBOptions = {},
): Promise<Customer> {
  const customer = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { transaction };

    const existingCustomer = await getCustomerByUserAndCurrency(
      args.user,
      args.currency,
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
    currency: args.currency,
    stripeCustomerId: stripeCustomer.id,
  };

  let insertedCustomer: Customer;

  try {
    insertedCustomer = await insertCustomer(insertCustomerArgs, options);
  } catch (error) {
    await stripe.customers.del(stripeCustomer.id);

    throw error;
  }

  return insertedCustomer;
}
