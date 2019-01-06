import passport from 'passport';

import { googleStrategy } from './strategies';

passport.use(googleStrategy);

export default passport;
