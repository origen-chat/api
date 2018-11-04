import { Router } from 'express';

import {
  livenessProbeController,
  readinessProbeController,
} from '../controllers';

export const router = Router();

router
  .get('/healthz', livenessProbeController)

  .get('/ready', readinessProbeController);
