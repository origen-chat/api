import { doInTransaction } from '../db';
import {
  getUserBySocialCredentials,
  linkSocialCredentialsToUser,
  SocialCredentials,
} from '../socialLogins';
import { DBOptions } from '../types';
import { createUser, CreateUserArgs, getUserByEmail, User } from '../users';
import { enqueuePostRegisterUserJob } from './jobs';

export async function getUserBySocialCredentialsOrRegisterUser(
  socialCredentials: SocialCredentials,
  userData: CreateUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const existingOrRegisteredUser = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    let user = await getUserBySocialCredentials(
      socialCredentials,
      optionsWithTransaction,
    );

    if (!user) {
      user = await getUserByEmailOrRegisterUser(
        socialCredentials,
        userData,
        optionsWithTransaction,
      );
    }

    return user;
  }, options);

  return existingOrRegisteredUser;
}

async function getUserByEmailOrRegisterUser(
  socialCredentials: SocialCredentials,
  userData: CreateUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const { email } = userData;

  const existingOrRegisteredUser = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    let user = await getUserByEmail(email, optionsWithTransaction);

    if (!user) {
      user = await registerUser(
        socialCredentials,
        userData,
        optionsWithTransaction,
      );
    }

    return user;
  }, options);

  return existingOrRegisteredUser;
}

async function registerUser(
  socialCredentials: SocialCredentials,
  userData: CreateUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const registeredUser = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    const user = await insertUserAndLinkSocialCredentials(
      socialCredentials,
      userData,
      optionsWithTransaction,
    );

    return user;
  }, options);

  await enqueuePostRegisterUserJob(registeredUser);

  return registeredUser;
}

async function insertUserAndLinkSocialCredentials(
  socialCredentials: SocialCredentials,
  userData: CreateUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const userWithLinkedSocialCredentials = await doInTransaction(
    async transaction => {
      const optionsWithTransaction: DBOptions = { ...options, transaction };

      const user = await createUser(userData, optionsWithTransaction);

      await linkSocialCredentialsToUser(
        user,
        socialCredentials,
        optionsWithTransaction,
      );

      return user;
    },
    options,
  );

  return userWithLinkedSocialCredentials;
}
