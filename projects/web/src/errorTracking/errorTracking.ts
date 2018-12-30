import * as sentry from '@sentry/browser';

import { env } from '../config';
import { isProductionEnvironment } from '../helpers';

export function initializeErrorTracking(): void {
  const sentryOptions: sentry.BrowserOptions = {
    dsn: env.sentryDsn,
    enabled: env.enableErrorTracking,
    environment: env.nodeEnvironment,
    debug: !isProductionEnvironment,
  };

  sentry.init(sentryOptions);
}

export function captureException(error: Error): void {
  sentry.captureException(error);
}
