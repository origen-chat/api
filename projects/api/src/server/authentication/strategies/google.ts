import {
  IOAuth2StrategyOption,
  Strategy as GoogleStrategy,
} from 'passport-google-oauth20';

import { env } from '../../../config';

const { googleClientId, googleClientSecret } = env;

const googleStrategyOptions: IOAuth2StrategyOption = {
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: '',
};

function verifyFn(): null {
  return null;
}

const googleStrategy = new GoogleStrategy(googleStrategyOptions, verifyFn);

export default googleStrategy;
