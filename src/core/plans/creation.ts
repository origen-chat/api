import Stripe from 'stripe';

import { insertIntoDB } from '../db';
import { DBOptions } from '../types';

import { plansTableName } from './constants';
import { makeStripePlanData } from './helpers';
import { Plan } from './types';

export type InsertPlanIntoDBArgs = Pick<Plan, 'description'> &
  Readonly<{
    stripePlan: Stripe.plans.IPlan;
  }>;

export async function insertPlanIntoDB(
  args: InsertPlanIntoDBArgs,
  options: DBOptions = {},
): Promise<Plan> {
  const doInsertPlanArgs = makeDoInsertPlanIntoDBArgs(args);

  const plan = await doInsertPlanIntoDB(doInsertPlanArgs, options);

  return plan;
}

function makeDoInsertPlanIntoDBArgs(
  args: InsertPlanIntoDBArgs,
): DoInsertPlanIntoDBArgs {
  const doInsertPlanIntoDBArgs: DoInsertPlanIntoDBArgs = {
    description: args.description,
    stripePlanData: makeStripePlanData(args.stripePlan),
  };

  return doInsertPlanIntoDBArgs;
}

export type DoInsertPlanIntoDBArgs = Pick<
  Plan,
  'description' | 'stripePlanData'
>;

export async function doInsertPlanIntoDB(
  args: DoInsertPlanIntoDBArgs,
  options: DBOptions = {},
): Promise<Plan> {
  const plan = await insertIntoDB({ data: args, tableName: plansTableName });

  return plan;
}
