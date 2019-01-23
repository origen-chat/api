import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
import { Workspace } from '../workspaces';

import { subscriptionsTableName } from './constants';
import { Subscription } from './types';

export async function getSubscriptionById(
  id: ID,
  options: DBOptions = {},
): Promise<Subscription | null> {
  const subscription = await getSubscriptionByFromDB({ id }, options);

  return subscription;
}

export type GetSubscriptionByFromDBArgs =
  | Pick<Subscription, 'id'> &
      Readonly<{ stripeSubscriptionId?: undefined; workspace?: undefined }>
  | Readonly<{
      stripeSubscriptionId: string;
      id?: undefined;
      workspace?: undefined;
    }>
  | Readonly<{
      workspace: Workspace;
      id?: undefined;
      stripeSubscriptionId?: undefined;
    }>;

async function getSubscriptionByFromDB(
  args: GetSubscriptionByFromDBArgs,
  options: DBOptions = {},
): Promise<Subscription | null> {
  const query = db
    .select(`${subscriptionsTableName}.*`)
    .from(subscriptionsTableName)
    .first();

  if (args.id) {
    query.where({ id: args.id });
  } else if (args.stripeSubscriptionId) {
    query.whereRaw("stripeSubscriptionData->'id' = ?", [
      args.stripeSubscriptionId,
    ]);
  } else if (args.workspace) {
    query.where({ workspaceId: args.workspace.id });
  }

  maybeAddTransactionToQuery(query, options);

  const subscription: Subscription | null = await query;

  return subscription;
}

export async function getSubscriptionByStripeSubscriptionId(
  stripeSubscriptionId: string,
  options: DBOptions = {},
): Promise<Subscription | null> {
  const subscription = await getSubscriptionByFromDB(
    { stripeSubscriptionId },
    options,
  );

  return subscription;
}

export async function getSubscriptionByWorkspace(
  workspace: Workspace,
  options: DBOptions = {},
): Promise<Subscription | null> {
  const subscription = await getSubscriptionByFromDB({ workspace }, options);

  return subscription;
}
