import { doInTransaction } from '../db';
import { DBOptions } from '../types';
import { createCustomer, CreateCustomerArgs } from './creation';
import { getCustomerByUser } from './get';
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
