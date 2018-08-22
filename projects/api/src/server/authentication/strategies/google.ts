import {
  IOAuth2StrategyOption,
  Profile,
  Strategy as GoogleStrategy,
} from 'passport-google-oauth20';

import { env } from '../../../config';
import { users } from '../../../core';
import { makeOauth2CallbackUrl } from '../../helpers';

const { googleClientId, googleClientSecret } = env;

const googleStrategyOptions: IOAuth2StrategyOption = {
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: makeOauth2CallbackUrl('google'),
};

export const googleStrategy = new GoogleStrategy(
  googleStrategyOptions,
  verifyFunction,
);

export type DoneFunction = (error: any, user?: users.User) => void;

function verifyFunction(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: DoneFunction,
): void {}
