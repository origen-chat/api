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
  const webPushSubscriptions = await getWebPushSubscriptionsByFromDB(
    { userIds },
    options,
  );

  const webPushSubscriptionsByUserIds = groupBy(
    webPushSubscription => webPushSubscription.userId.toString(),
    webPushSubscriptions,
  ) as any;

  return webPushSubscriptionsByUserIds;
}

export type GetWebPushSubscriptionsByFromDBArgs = Readonly<
  | { userIds: ReadonlyArray<ID>; endpoints?: undefined }
  | { endpoints: ReadonlyArray<string>; userIds?: undefined }
>;

export async function getWebPushSubscriptionsByFromDB(
  args: GetWebPushSubscriptionsByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<WebPushSubscription>> {
  const query = db.select('*').from(webPushSubscriptionsTableName);

  if (args.userIds) {
    query.whereIn('userId', args.userIds as any);
  } else if (args.endpoints) {
    query.whereIn('endpoint', args.endpoints as any);
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
  const [webPushSubscription] = await getWebPushSubscriptionsByFromDB(
    { endpoints: [endpoint] },
    options,
  );

  if (!webPushSubscription) {
    return null;
  }

  return webPushSubscription;
}
