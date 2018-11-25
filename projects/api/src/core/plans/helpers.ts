import { omit } from 'ramda';
import Stripe from 'stripe';

import { StripePlanData } from './types';

export function makeStripePlanData(
  stripePlan: Stripe.plans.IPlan,
): StripePlanData {
  const stripePlanData: StripePlanData = omit(['object'], stripePlan);

  return stripePlanData;
}
