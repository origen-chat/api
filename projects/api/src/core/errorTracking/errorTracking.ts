import * as sentry from '@sentry/node';

import { env } from '../../config';
import logger from '../logger';

export function initializeErrorTracking(): void {
  const sentryOptions: sentry.NodeOptions = {
    enabled: env.enableErrorTracking,
    debug: env.debug,
    dsn: env.sentryDsn,
  };

  sentry.init(sentryOptions);

  logger.info('🐛 error tracking (Sentry) initialized');
}
