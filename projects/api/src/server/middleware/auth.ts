import { Handler } from 'express';
import { AuthenticateOptions } from 'passport';

import { googleStrategy, passport } from '../authentication';

export function callPassportWithStrategyName(
  passportOptions: AuthenticateOptions,
): Handler {
  const handler: Handler = (req, res, next) => {
    const { provider } = req.params;
    const strategyName = getPassportStrategyName(provider);

    return passport.authenticate(strategyName, passportOptions)(req, res, next);
  };

  return handler;
}

function getPassportStrategyName(provider: string): string {
  if (provider === 'google') {
    return googleStrategy.name;
  }

  throw new Error('invalid provider');
}
