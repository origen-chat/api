import { Profile } from 'passport-google-oauth20';

import { socialLogins, types, userRegistration, users } from '../../../core';

export type DoneFunction = (error: Error | null, user?: users.User) => void;

export async function oauth2VerifyFunction(
  profile: Profile,
  done: DoneFunction,
) {
  let socialCredentials: socialLogins.SocialCredentials;
  try {
    socialCredentials = getSocialCredentialsFromProfile(profile);
  } catch (error) {
    return done(error);
  }

  let userData: users.InsertUserArgs;
  try {
    userData = getUserDataFromProfile(profile);
  } catch (error) {
    return done(error);
  }

  let user: users.User;
  try {
    user = await userRegistration.getUserBySocialCredentialsOrRegisterUser(
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
): socialLogins.SocialCredentials {
  if (!isValidProvider(profile.provider)) {
    throw new Error('invalid provider');
  }

  const socialCredentials: socialLogins.SocialCredentials = {
    provider: profile.provider,
    providerUserId: profile.id,
  };

  return socialCredentials;
}

function isValidProvider(value: string): value is socialLogins.Provider {
  return socialLogins.providers.includes(value as socialLogins.Provider);
}

function getUserDataFromProfile(profile: Profile): users.InsertUserArgs {
  if (!profile.emails || profile.emails.length === 0) {
    throw new Error('no provided email');
  }

  const username = 'test';
  const email: types.Email = profile.emails[0].value;

  const userData: users.InsertUserArgs = { username, email };

  return userData;
}
