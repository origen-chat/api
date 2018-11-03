import { ID, InsertedAtField, URL } from '../types';

export type WebPushSubscription = Readonly<{
  userId: ID;
  endpoint: URL;
  keys: WebPushSubscriptionKeys;
}> &
  InsertedAtField;

export type WebPushSubscriptionKeys = Readonly<{
  auth: string;
  p256dh: string;
}>;

export type RawWebPushSubscription = Pick<
  WebPushSubscription,
  'userId' | 'endpoint' | 'insertedAt'
> &
  Pick<WebPushSubscriptionKeys, 'auth' | 'p256dh'>;
