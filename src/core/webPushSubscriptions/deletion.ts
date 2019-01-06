import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { webPushSubscriptionsTableName } from './constants';
import { WebPushSubscription } from './types';

export async function deleteWebPushSubscription(
  webPushSubscription: WebPushSubscription,
  options: DBOptions = {},
): Promise<WebPushSubscription> {
  await deleteWebPushSubscriptionFromDB(webPushSubscription, options);

  return webPushSubscription;
}

export async function deleteWebPushSubscriptionFromDB(
  webPushSubscription: WebPushSubscription,
  options: DBOptions = {},
): Promise<WebPushSubscription> {
  await doDeleteWebPushSubscriptionFromDB(webPushSubscription, options);

  return webPushSubscription;
}

export async function doDeleteWebPushSubscriptionFromDB(
  webPushSubscription: WebPushSubscription,
  options: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(webPushSubscriptionsTableName)
    .where({
      userId: webPushSubscription.userId,
      endpoint: webPushSubscription.endpoint,
    });

  maybeAddTransactionToQuery(query, options);

  await query;
}
