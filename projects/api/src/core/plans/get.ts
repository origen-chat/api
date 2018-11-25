import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
import { plansTableName } from './constants';
import { Plan } from './types';

export async function getPlanById(
  id: ID,
  options: DBOptions = {},
): Promise<Plan | null> {
  const plan = await getPlanByFromDB({ id }, options);

  return plan;
}

export type GetPlanByFromDBArgs =
  | Pick<Plan, 'id'> & Readonly<{ stripePlanId?: undefined }>
  | Readonly<{ stripePlanId: string; id?: undefined }>;

async function getPlanByFromDB(
  args: GetPlanByFromDBArgs,
  options: DBOptions = {},
): Promise<Plan | null> {
  const query = db
    .select('*')
    .from(plansTableName)
    .first();

  if (args.id) {
    query.where({ id: args.id });
  } else if (args.stripePlanId) {
    query.whereRaw("stripePlanData->'id' = ?", [args.stripePlanId]);
  }

  maybeAddTransactionToQuery(query, options);

  const plan: Plan | null = await query;

  return plan;
}

export async function getPlanByStripePlanId(
  stripePlanId: string,
  options: DBOptions = {},
): Promise<Plan | null> {
  const plan = await getPlanByFromDB({ stripePlanId }, options);

  return plan;
}

export async function getPlansByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Plan>> {
  const plans = await getPlansBy({ ids }, options);

  return plans;
}

export type GetPlansByArgs = Readonly<{ ids: ReadonlyArray<ID> }>;

async function getPlansBy(
  args: GetPlansByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Plan>> {
  const query = db.select('*').from(plansTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const plans: ReadonlyArray<Plan> = await query;

  return plans;
}
