import { doInTransaction } from '../db';
import {
  getUserBySocialCredentials,
  linkSocialCredentialsToUser,
  SocialCredentials,
} from '../socialLogins';
import { DBOptions } from '../types';
import { getUserByEmail, insertUser, InsertUserArgs, User } from '../users';

export async function getUserBySocialCredentialsOrRegisterUser(
  socialCredentials: SocialCredentials,
  userData: InsertUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const existingOrRegisteredUser = await doInTransaction(
    async transaction => {
      const optionsWithTransaction: DBOptions = { transaction };

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
    },
    { transactionFromBefore: options.transaction },
  );

  return existingOrRegisteredUser;
}

async function getUserByEmailOrRegisterUser(
  socialCredentials: SocialCredentials,
  userData: InsertUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const { email } = userData;

  const existingOrRegisteredUser = await doInTransaction(
    async transaction => {
      const optionsWithTransaction: DBOptions = { transaction };

      let user = await getUserByEmail(email, optionsWithTransaction);

      if (!user) {
        user = await registerUser(
          socialCredentials,
          userData,
          optionsWithTransaction,
        );
      }

      return user;
    },
    { transactionFromBefore: options.transaction },
  );

  return existingOrRegisteredUser;
}

async function registerUser(
  socialCredentials: SocialCredentials,
  userData: InsertUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const user = await insertUserAndLinkSocialCredentials(
    socialCredentials,
    userData,
    options,
  );

  return user;
}

async function insertUserAndLinkSocialCredentials(
  socialCredentials: SocialCredentials,
  userData: InsertUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const userWithLinkedSocialCredentials = await doInTransaction(
    async transaction => {
      const optionsWithTransaction: DBOptions = { transaction };

      const user = await insertUser(userData, optionsWithTransaction);
      await linkSocialCredentialsToUser(
        user,
        socialCredentials,
        optionsWithTransaction,
      );

      return user;
    },
    { transactionFromBefore: options.transaction },
  );

  return userWithLinkedSocialCredentials;
}
