import Stripe from 'stripe';

import { ID, Identifiable, Omit, Timestamps } from '../types';

export type Subscription = Readonly<{
  customerId: ID;
  planId: ID;
  workspaceId: ID;
  stripeSubscriptionData: StripeSubscriptionData;
}> &
  Identifiable &
  Timestamps;

export type StripeSubscriptionData = Omit<
  Stripe.subscriptions.ISubscription,
  'object'
>;
