import {
  IOAuth2StrategyOption,
  Strategy as GoogleStrategy,
} from 'passport-google-oauth20';

import { env } from '../../../config';
import { makeOauth2CallbackUrl } from '../../helpers';

const { googleClientId, googleClientSecret } = env;

const googleStrategyOptions: IOAuth2StrategyOption = {
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: makeOauth2CallbackUrl('google'),
};

export const googleStrategy = new GoogleStrategy(
  googleStrategyOptions,
  verifyFn,
);

function verifyFn(): null {
  return null;
}
