import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { webPushSubscriptionsTableName } from './constants';
import { formatRawWebPushSubscription } from './helpers';
import { RawWebPushSubscription, WebPushSubscription } from './types';

export type InsertWebPushSubscriptionArgs = Pick<
  WebPushSubscription,
  'endpoint' | 'keys'
> &
  Readonly<{ user: User }>;

/**
 * Inserts a web push subscription.
 */
export async function insertWebPushSubscription(
  args: InsertWebPushSubscriptionArgs,
  options: DBOptions = {},
): Promise<WebPushSubscription> {
  const doInsertWebPushSubscriptionArgs = makeDoInsertWebPushSubscriptionArgs(
    args,
  );

  const rawWebPushSubscription = await doInsertWebPushSubscription(
    doInsertWebPushSubscriptionArgs,
    options,
  );

  const webPushSubscription = formatRawWebPushSubscription(
    rawWebPushSubscription,
  );

  return webPushSubscription;
}

function makeDoInsertWebPushSubscriptionArgs(
  args: InsertWebPushSubscriptionArgs,
): DoInsertWebPushSubscriptionArgs {
  const doInsertWebPushSubscriptionArgs: DoInsertWebPushSubscriptionArgs = {
    userId: args.user.id,
    endpoint: args.endpoint,
    auth: args.keys.auth,
    p256dh: args.keys.p256dh,
  };

  return doInsertWebPushSubscriptionArgs;
}

export type DoInsertWebPushSubscriptionArgs = Pick<
  RawWebPushSubscription,
  'userId' | 'endpoint' | 'auth' | 'p256dh'
>;

export async function doInsertWebPushSubscription(
  args: DoInsertWebPushSubscriptionArgs,
  options: DBOptions = {},
): Promise<RawWebPushSubscription> {
  const query = db
    .insert(args)
    .into(webPushSubscriptionsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [webPushSubscription] = await query;

  return webPushSubscription;
}
