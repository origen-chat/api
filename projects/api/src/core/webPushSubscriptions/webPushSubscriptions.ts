import { pick } from 'ramda';
import * as webPush from 'web-push';

import { DBOptions } from '../types';
import { User } from '../users';
import { deleteWebPushSubscription } from './deletion';
import { getWebPushSubscriptionByEndpoint } from './get';
import {
  insertWebPushSubscription,
  InsertWebPushSubscriptionArgs,
} from './insertion';
import { WebPushSubscription } from './types';

export type StoreWebPushSubscriptionIfItDoesntExistsArgs = Readonly<{
  user: User;
  pushSubscription: webPush.PushSubscription;
}>;

export async function storeWebPushSubscriptionIfNotStored(
  args: StoreWebPushSubscriptionIfItDoesntExistsArgs,
  options: DBOptions = {},
): Promise<WebPushSubscription> {
  const existingWebPushSubscription = await getWebPushSubscriptionByEndpoint(
    args.pushSubscription.endpoint,
    options,
  );

  if (existingWebPushSubscription) {
    return existingWebPushSubscription;
  }

  const insertWebPushSubscriptionArgs: InsertWebPushSubscriptionArgs = {
    user: args.user,
    endpoint: args.pushSubscription.endpoint,
    keys: args.pushSubscription.keys,
  };

  const insertedWebPushSubscription = await insertWebPushSubscription(
    insertWebPushSubscriptionArgs,
    options,
  );

  return insertedWebPushSubscription;
}

export async function sendWebPushNotification(
  webPushSubscription: WebPushSubscription,
  payload: any,
): Promise<void> {
  const pushSubscription: webPush.PushSubscription = pick(
    ['endpoint', 'keys'],
    webPushSubscription,
  );

  try {
    await webPush.sendNotification(pushSubscription, payload);
  } catch (error) {
    await deleteWebPushSubscription(webPushSubscription);
  }
}
