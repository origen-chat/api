import { insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';

import { webPushSubscriptionsTableName } from './constants';
import { formatRawWebPushSubscription } from './helpers';
import { RawWebPushSubscription, WebPushSubscription } from './types';

export type CreateWebPushSubscriptionArgs = InsertWebPushSubscriptionIntoDBArgs;

export async function createWebPushSubscription(
  args: InsertWebPushSubscriptionIntoDBArgs,
  options: DBOptions = {},
): Promise<WebPushSubscription> {
  const webPushSubscription = await insertWebPushSubscriptionIntoDB(
    args,
    options,
  );

  return webPushSubscription;
}

export type InsertWebPushSubscriptionIntoDBArgs = Pick<
  WebPushSubscription,
  'endpoint' | 'keys'
> &
  Readonly<{ user: User }>;

export async function insertWebPushSubscriptionIntoDB(
  args: InsertWebPushSubscriptionIntoDBArgs,
  options: DBOptions = {},
): Promise<WebPushSubscription> {
  const doInsertWebPushSubscriptionIntoDBArgs = makeDoInsertWebPushSubscriptionIntoDBArgs(
    args,
  );

  const rawWebPushSubscription = await doInsertWebPushSubscriptionIntoDB(
    doInsertWebPushSubscriptionIntoDBArgs,
    options,
  );

  const webPushSubscription = formatRawWebPushSubscription(
    rawWebPushSubscription,
  );

  return webPushSubscription;
}

function makeDoInsertWebPushSubscriptionIntoDBArgs(
  args: InsertWebPushSubscriptionIntoDBArgs,
): DoInsertWebPushSubscriptionIntoDBArgs {
  const doInsertWebPushSubscriptionIntoDBArgs: DoInsertWebPushSubscriptionIntoDBArgs = {
    userId: args.user.id,
    endpoint: args.endpoint,
    auth: args.keys.auth,
    p256dh: args.keys.p256dh,
  };

  return doInsertWebPushSubscriptionIntoDBArgs;
}

export type DoInsertWebPushSubscriptionIntoDBArgs = Pick<
  RawWebPushSubscription,
  'userId' | 'endpoint' | 'auth' | 'p256dh'
>;

export async function doInsertWebPushSubscriptionIntoDB(
  args: DoInsertWebPushSubscriptionIntoDBArgs,
  options: DBOptions = {},
): Promise<RawWebPushSubscription> {
  const webPushSubscription = await insertIntoDB(
    { data: args, tableName: webPushSubscriptionsTableName },
    options,
  );

  return webPushSubscription;
}
