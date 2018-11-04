import { groupBy } from 'ramda';

import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID, Nullable } from '../types';
import { webPushSubscriptionsTableName } from './constants';
import { formatRawWebPushSubscription } from './helpers';
import { WebPushSubscription } from './types';

export async function getWebPushSubscriptionsByUserIds<TUserID extends ID>(
  userIds: ReadonlyArray<TUserID>,
  options: DBOptions = {},
): Promise<Record<TUserID, ReadonlyArray<WebPushSubscription>>> {
  const webPushSubscriptions = await getWebPushSubscriptionsBy(
    { userIds },
    options,
  );

  const webPushSubscriptionsByUserIds = groupBy(
    webPushSubscription => webPushSubscription.userId.toString(),
    webPushSubscriptions,
  ) as any;

  return webPushSubscriptionsByUserIds;
}

export type GetWebPushSubscriptionsByArgs = Readonly<
  { userIds: ReadonlyArray<ID> } | { endpoints: ReadonlyArray<string> }
>;

export async function getWebPushSubscriptionsBy(
  args: GetWebPushSubscriptionsByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<WebPushSubscription>> {
  const query = db.select('*').from(webPushSubscriptionsTableName);

  if ((args as any).userIds) {
    query.whereIn('userId', (args as any).userIds);
  } else if ((args as any).endpoints) {
    query.whereIn('endpoint', (args as any).endpoints);
  }

  maybeAddTransactionToQuery(query, options);

  const rawWebPushSubscriptions = await query;

  const webPushSubscriptions = rawWebPushSubscriptions.map(
    formatRawWebPushSubscription,
  );

  return webPushSubscriptions;
}

export async function getWebPushSubscriptionsByUserId<TUserID extends ID>(
  userId: TUserID,
  options: DBOptions = {},
): Promise<ReadonlyArray<WebPushSubscription>> {
  const webPushSubscriptionsByUserIds = await getWebPushSubscriptionsByUserIds(
    [userId],
    options,
  );

  const webPushSubscriptions = webPushSubscriptionsByUserIds[userId];

  return webPushSubscriptions;
}

export async function getWebPushSubscriptionByEndpoint(
  endpoint: string,
  options: DBOptions = {},
): Promise<Nullable<WebPushSubscription>> {
  const [webPushSubscription] = await getWebPushSubscriptionsBy(
    { endpoints: [endpoint] },
    options,
  );

  if (!webPushSubscription) {
    return null;
  }

  return webPushSubscription;
}
