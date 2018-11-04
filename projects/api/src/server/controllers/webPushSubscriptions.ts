import http from 'http';

import { Handler } from 'express';

import * as core from '../../core';
import { getUserFromAuthorizationHeader } from '../authentication';

export const storeWebPushSubscriptionController: Handler = async (
  request,
  response,
) => {
  const viewer = await getUserFromAuthorizationHeader(
    request.headers.authorization,
  );

  if (!viewer) {
    response.status(401).end(http.STATUS_CODES[401]);

    return;
  }

  const pushSubscription = request.body;

  await core.webPushSubscriptions.storeWebPushSubscriptionIfNotStored({
    user: viewer,
    pushSubscription,
  });

  response.status(200).end(http.STATUS_CODES[200]);
};
