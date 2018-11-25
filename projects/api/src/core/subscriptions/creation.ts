import Stripe from 'stripe';

import { Customer } from '../customers';
import { insertIntoDB } from '../db';
import { Plan } from '../plans';
import { DBOptions } from '../types';
import { Workspace } from '../workspaces';
import { subscriptionsTableName } from './constants';
import { makeStripeSubscriptionData } from './helpers';
import { Subscription } from './types';

export type CreateSubscriptionArgs = InsertSubscriptionIntoDBArgs;

export async function createSubscription(
  args: CreateSubscriptionArgs,
  options: DBOptions = {},
): Promise<Subscription> {
  const insertSubscriptionInDBArgs: InsertSubscriptionIntoDBArgs = {
    workspace: args.workspace,
    customer: args.customer,
    plan: args.plan,
    stripeSubscription: args.stripeSubscription,
  };

  const subscription = await insertSubscriptionIntoDB(
    insertSubscriptionInDBArgs,
    options,
  );

  return subscription;
}

export type InsertSubscriptionIntoDBArgs = Readonly<{
  customer: Customer;
  plan: Plan;
  workspace: Workspace;
  stripeSubscription: Stripe.subscriptions.ISubscription;
}>;

export async function insertSubscriptionIntoDB(
  args: InsertSubscriptionIntoDBArgs,
  options: DBOptions = {},
): Promise<Subscription> {
  const doInsertSubscriptionArgs = makeDoInsertSubscriptionIntoDBArgs(args);

  const subscription = await doInsertSubscriptionIntoDB(
    doInsertSubscriptionArgs,
    options,
  );

  return subscription;
}

function makeDoInsertSubscriptionIntoDBArgs(
  args: InsertSubscriptionIntoDBArgs,
): DoInsertSubscriptionIntoDBArgs {
  const doInsertSubscriptionIntoDBArgs: DoInsertSubscriptionIntoDBArgs = {
    customerId: args.customer.id,
    workspaceId: args.workspace.id,
    planId: args.plan.id,
    stripeSubscriptionData: makeStripeSubscriptionData(args.stripeSubscription),
  };

  return doInsertSubscriptionIntoDBArgs;
}

export type DoInsertSubscriptionIntoDBArgs = Pick<
  Subscription,
  'customerId' | 'workspaceId' | 'planId' | 'stripeSubscriptionData'
>;

export async function doInsertSubscriptionIntoDB(
  args: DoInsertSubscriptionIntoDBArgs,
  options: DBOptions = {},
): Promise<Subscription> {
  const subscription = await insertIntoDB(
    { data: args, tableName: subscriptionsTableName },
    options,
  );

  return subscription;
}
