import { beginTransaction } from '../db';
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
): Promise<User> {
  const user = await getUserBySocialCredentials(socialCredentials);

  if (!user) {
    return getUserByEmailOrRegisterUser(socialCredentials, userData);
  }

  return user;
}

async function getUserByEmailOrRegisterUser(
  socialCredentials: SocialCredentials,
  userData: InsertUserArgs,
): Promise<User> {
  const { email } = userData;

  const user = await getUserByEmail(email);

  if (!user) {
    return registerUser(socialCredentials, userData);
  }

  return user;
}

async function registerUser(
  socialCredentials: SocialCredentials,
  userData: InsertUserArgs,
): Promise<User> {
  const user = await insertUserAndLinkSocialCredentials(
    socialCredentials,
    userData,
  );

  return user;
}

async function insertUserAndLinkSocialCredentials(
  socialCredentials: SocialCredentials,
  userData: InsertUserArgs,
): Promise<User> {
  const transaction = await beginTransaction();
  try {
    const opts: DBOptions = { transaction };

    const user = await insertUser(userData, opts);
    await linkSocialCredentialsToUser(user, socialCredentials, opts);

    await transaction.commit();

    return user;
  } catch (error) {
    await transaction.rollback();

    throw error;
  }
}
