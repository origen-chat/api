import { PassportStatic } from 'passport';

import { googleStrategy } from './strategies';

export function initializePassport(passport: PassportStatic): void {
  passport.use(googleStrategy);
}
