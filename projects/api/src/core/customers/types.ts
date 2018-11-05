import { ID, Timestamps } from '../types';

export type Customer = Readonly<{
  userId: ID;
  stripeCustomerId: string;
}> &
  Timestamps;
