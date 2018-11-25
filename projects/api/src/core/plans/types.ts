import Stripe from 'stripe';

import { Identifiable, Omit, Timestamps } from '../types';

export type Plan = Readonly<{
  description: string | null;
  stripePlanData: StripePlanData;
}> &
  Identifiable &
  Timestamps;

export type StripePlanData = Omit<Stripe.plans.IPlan, 'object'>;
