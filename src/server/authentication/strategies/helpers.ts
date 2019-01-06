import { Profile } from 'passport-google-oauth20';

import * as core from '../../../core';

export type DoneFunction = (
  error: Error | null,
  user?: core.users.User,
) => void;

export async function oauth2VerifyFunction(
  profile: Profile,
  done: DoneFunction,
) {
  let socialCredentials: core.socialLogins.SocialCredentials;
  try {
    socialCredentials = getSocialCredentialsFromProfile(profile);
  } catch (error) {
    return done(error);
  }

  let userData: core.users.CreateUserArgs;
  try {
    userData = getUserDataFromProfile(profile);
  } catch (error) {
    return done(error);
  }

  let user: core.users.User;
  try {
    user = await core.userRegistration.getUserBySocialCredentialsOrRegisterUser(
      socialCredentials,
      userData,
    );
  } catch (error) {
    return done(error);
  }

  return done(null, user);
}

function getSocialCredentialsFromProfile(
  profile: Profile,
): core.socialLogins.SocialCredentials {
  if (!isValidProvider(profile.provider)) {
    throw new Error('invalid provider');
  }

  const socialCredentials: core.socialLogins.SocialCredentials = {
    provider: profile.provider,
    providerUserId: profile.id,
  };

  return socialCredentials;
}

function isValidProvider(value: string): value is core.socialLogins.Provider {
  return core.socialLogins.providers.includes(
    value as core.socialLogins.Provider,
  );
}

function getUserDataFromProfile(profile: Profile): core.users.CreateUserArgs {
  if (!profile.emails || profile.emails.length === 0) {
    throw new Error('no provided email');
  }

  const username = core.users.generateRandomUsername();
  const email: core.types.Email = profile.emails[0].value;

  const userData: core.users.CreateUserArgs = { username, email };

  return userData;
}
