import { ID, Identifiable, Timestamps } from '../types';

export type Customer = Readonly<{
  userId: ID;
  stripeCustomerId: string;
  currency: string;
}> &
  Identifiable &
  Timestamps;
