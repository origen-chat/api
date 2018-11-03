import { RawWebPushSubscription, WebPushSubscription } from './types';

export function formatRawWebPushSubscription(
  rawWebPushSubscription: RawWebPushSubscription,
): WebPushSubscription {
  const webPushSubscription: WebPushSubscription = {
    userId: rawWebPushSubscription.userId,
    endpoint: rawWebPushSubscription.endpoint,
    keys: {
      auth: rawWebPushSubscription.auth,
      p256dh: rawWebPushSubscription.p256dh,
    },
    insertedAt: rawWebPushSubscription.insertedAt,
  };

  return webPushSubscription;
}
