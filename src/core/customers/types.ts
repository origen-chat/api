import Stripe from 'stripe';

import { ID, Identifiable, Omit, Timestamps } from '../types';

export type Customer = Readonly<{
  userId: ID;
  stripeCustomerData: StripeCustomerData;
}> &
  Identifiable &
  Timestamps;

export type StripeCustomerData = Omit<Stripe.customers.ICustomer, 'object'>;
