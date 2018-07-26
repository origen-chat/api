import Raven from 'raven-js';

import { isProductionEnvironment } from '../helpers';

export const initializeErrorTracking = (): void => {
  if (isProductionEnvironment) {
    const sentryDsn = '';
    const ravenOptions: Raven.RavenOptions = {
      environment: process.env.NODE_ENV,
      debug: !isProductionEnvironment,
    };

    Raven.config(sentryDsn, ravenOptions).install();
  }
};

export const captureException = (
  error: Error,
  options?: Raven.RavenOptions,
) => {
  if (isProductionEnvironment) {
    Raven.captureException(error, options);
  }
};
