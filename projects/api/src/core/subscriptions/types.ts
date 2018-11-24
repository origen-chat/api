import { ID, Identifiable, Timestamps } from '../types';

export type Subscription = Readonly<{
  customerId: ID;
  stripePlanId: string;
  workspaceId: ID;
  stripeSubscriptionData: object;
  stripeSubscriptionId: string;
}> &
  Identifiable &
  Timestamps;
