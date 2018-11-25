import { omit } from 'ramda';
import Stripe from 'stripe';

import { StripeCustomerData } from './types';

export function makeStripeCustomerData(
  stripeCustomer: Stripe.customers.ICustomer,
): StripeCustomerData {
  const stripeCustomerData: StripeCustomerData = omit(
    ['object'],
    stripeCustomer,
  );

  return stripeCustomerData;
}
