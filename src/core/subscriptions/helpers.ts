import { omit } from 'ramda';
import Stripe from 'stripe';

import { Customer, getCustomerByStripeCustomerId } from '../customers';
import { getPlanByStripePlanId, Plan } from '../plans';
import { DBOptions } from '../types';
import { StripeSubscriptionData } from './types';

export function makeStripeSubscriptionData(
  stripeSubscription: Stripe.subscriptions.ISubscription,
): StripeSubscriptionData {
  const stripeSubscriptionData: StripeSubscriptionData = omit(
    ['object'],
    stripeSubscription,
  );

  return stripeSubscriptionData;
}

export type GetCustomerAndPlanFromStripeSubscriptionOrThrowReturnType = Readonly<{
  customer: Customer;
  plan: Plan;
}>;

export async function getCustomerAndPlanFromStripeSubscriptionOrThrow(
  stripeSubscription: Stripe.subscriptions.ISubscription,
  options: DBOptions = {},
): Promise<GetCustomerAndPlanFromStripeSubscriptionOrThrowReturnType> {
  const { customer, plan } = await getCustomerAndPlanFromStripeSubscription(
    stripeSubscription,
    options,
  );

  if (!customer) {
    throw new Error('no customer');
  }

  if (!plan) {
    throw new Error('no plan');
  }

  const data = { customer, plan };

  return data;
}

export type GetCustomerAndPlanFromStripeSubscriptionReturnType = Readonly<{
  customer: Customer | null;
  plan: Plan | null;
}>;

export async function getCustomerAndPlanFromStripeSubscription(
  stripeSubscription: Stripe.subscriptions.ISubscription,
  options: DBOptions = {},
): Promise<GetCustomerAndPlanFromStripeSubscriptionReturnType> {
  const stripeCustomerId =
    typeof stripeSubscription.customer === 'string'
      ? stripeSubscription.customer
      : stripeSubscription.customer.id;

  const stripePlanId = stripeSubscription.plan.id;

  const [customer, plan] = await Promise.all([
    getCustomerByStripeCustomerId(stripeCustomerId, options),
    getPlanByStripePlanId(stripePlanId, options),
  ]);

  const data: GetCustomerAndPlanFromStripeSubscriptionReturnType = {
    customer,
    plan,
  };

  return data;
}
