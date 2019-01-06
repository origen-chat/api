import {
  IOAuth2StrategyOption,
  Profile,
  Strategy as GoogleStrategy,
} from 'passport-google-oauth20';

import { env } from '../../../config';
import * as core from '../../../core';
import { makeOauth2CallbackUrl } from '../../helpers';
import { DoneFunction, oauth2VerifyFunction } from './helpers';

const { googleClientId, googleClientSecret } = env;

const googleStrategyOptions: IOAuth2StrategyOption = {
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: makeOauth2CallbackUrl(core.socialLogins.Provider.Google),
};

export const googleStrategy = new GoogleStrategy(
  googleStrategyOptions,
  verifyFunction,
);

async function verifyFunction(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: DoneFunction,
): Promise<void> {
  await oauth2VerifyFunction(profile, done);
}
