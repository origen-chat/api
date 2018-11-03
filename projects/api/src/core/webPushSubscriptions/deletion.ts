import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { webPushSubscriptionsTableName } from './constants';
import { WebPushSubscription } from './types';

/**
 * Deletes a web push subscription.
 */
export async function deleteWebPushSubscription(
  webPushSubscription: WebPushSubscription,
  options: DBOptions = {},
): Promise<WebPushSubscription> {
  await doDeleteWebPushSubscription(webPushSubscription, options);

  return webPushSubscription;
}

export async function doDeleteWebPushSubscription(
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
