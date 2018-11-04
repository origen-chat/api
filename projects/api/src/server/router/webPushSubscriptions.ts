import { Router } from 'express';

import { storeWebPushSubscriptionController } from '../controllers';

export const router = Router();

router.post('/subscriptions', storeWebPushSubscriptionController);
