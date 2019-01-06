import * as sentry from '@sentry/node';

import { env } from '../../config';
import logger from '../logger';

const sentryOptions: sentry.NodeOptions = {
  enabled: env.enableErrorTracking,
  debug: env.debug,
  dsn: env.sentryDsn,
};

export function initializeErrorTracking(): void {
  sentry.init(sentryOptions);

  logger.info('🐛 error tracking (Sentry) initialized');
}
