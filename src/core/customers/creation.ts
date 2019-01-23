import Stripe from 'stripe';

import { insertIntoDB } from '../db';
import stripe from '../stripe';
import { DBOptions } from '../types';
import { User } from '../users';

import { customersTableName } from './constants';
import { makeStripeCustomerData } from './helpers';
import { Customer } from './types';

export type CreateCustomerArgs = InsertCustomerIntoDBArgs;

export async function createCustomer(
  args: CreateCustomerArgs,
  options: DBOptions = {},
): Promise<Customer> {
  const stripeCustomer = await stripe.customers.create({});

  const insertCustomerArgs: InsertCustomerIntoDBArgs = {
    user: args.user,
    stripeCustomer,
  };

  let insertedCustomer: Customer;

  try {
    insertedCustomer = await insertCustomerIntoDB(insertCustomerArgs, options);
  } catch (error) {
    await stripe.customers.del(stripeCustomer.id);

    throw error;
  }

  return insertedCustomer;
}

type InsertCustomerIntoDBArgs = Readonly<{
  user: User;
  stripeCustomer: Stripe.customers.ICustomer;
}>;

async function insertCustomerIntoDB(
  args: InsertCustomerIntoDBArgs,
  options: DBOptions = {},
): Promise<Customer> {
  const doInsertCustomerIntoDBArgs = makeDoInsertCustomerIntoDBArgs(args);

  const customer = await doInsertCustomerIntoDB(
    doInsertCustomerIntoDBArgs,
    options,
  );

  return customer;
}

function makeDoInsertCustomerIntoDBArgs(
  args: InsertCustomerIntoDBArgs,
): DoInsertCustomerIntoDBArgs {
  const doInsertCustomerArgs: DoInsertCustomerIntoDBArgs = {
    userId: args.user.id,
    stripeCustomerData: makeStripeCustomerData(args.stripeCustomer),
  };

  return doInsertCustomerArgs;
}

type DoInsertCustomerIntoDBArgs = Pick<
  Customer,
  'userId' | 'stripeCustomerData'
>;

async function doInsertCustomerIntoDB(
  args: DoInsertCustomerIntoDBArgs,
  options: DBOptions = {},
): Promise<Customer> {
  const customer = await insertIntoDB(
    { data: args, tableName: customersTableName },
    options,
  );

  return customer;
}
