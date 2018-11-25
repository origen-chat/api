import Stripe from 'stripe';

import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { plansTableName } from './constants';
import { makeStripePlanData } from './helpers';
import { Plan } from './types';

export type UpdatePlanInDBArgs = Partial<
  Pick<Plan, 'description'> &
    Readonly<{
      stripePlan: Stripe.plans.IPlan;
    }>
>;

export async function updatePlanInDB(
  plan: Plan,
  args: UpdatePlanInDBArgs,
  options: DBOptions = {},
): Promise<Plan> {
  const doUpdatePlanArgs = makeDoUpdatePlanInDBArgs(args);

  const updatedPlan = await doUpdatePlanInDB(plan, doUpdatePlanArgs, options);

  return updatedPlan;
}

function makeDoUpdatePlanInDBArgs(
  args: UpdatePlanInDBArgs,
): DoUpdatePlanInDBArgs {
  const doUpdatePlanArgs: DoUpdatePlanInDBArgs = {
    description: args.description,
    stripePlanData: args.stripePlan && makeStripePlanData(args.stripePlan),
  };

  return doUpdatePlanArgs;
}

export type DoUpdatePlanInDBArgs = Partial<
  Pick<Plan, 'description' | 'stripePlanData'>
>;

export async function doUpdatePlanInDB(
  plan: Plan,
  args: DoUpdatePlanInDBArgs,
  options: DBOptions = {},
): Promise<Plan> {
  const data = {
    description: args.description,
    stripePlanData: args.stripePlanData,
    updatedAt: new Date().toISOString(),
  };

  const query = db(plansTableName)
    .update(data)
    .where({ id: plan.id })
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [updatedPlan] = await query;

  return updatedPlan;
}
