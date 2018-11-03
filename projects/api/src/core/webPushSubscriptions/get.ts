import { groupBy } from 'ramda';

import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
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

export type GetWebPushSubscriptionsByArgs = Readonly<{
  userIds: ReadonlyArray<ID>;
}>;

export async function getWebPushSubscriptionsBy(
  args: GetWebPushSubscriptionsByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<WebPushSubscription>> {
  const query = db.select('*').from(webPushSubscriptionsTableName);

  query.whereIn('userId', args.userIds as any);

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
