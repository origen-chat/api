import { transaction } from '../db';
import {
  getUserBySocialCredentials,
  linkSocialCredentialsToUser,
  SocialCredentials,
  SocialLogin,
} from '../socialLogins';
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
  const { user } = await transaction(() =>
    insertUserAndLinkSocialCredentials(socialCredentials, userData),
  );

  return user;
}

async function insertUserAndLinkSocialCredentials(
  socialCredentials: SocialCredentials,
  userData: InsertUserArgs,
): Promise<{ user: User; socialLogin: SocialLogin }> {
  const user = await insertUser(userData);
  const socialLogin = await linkSocialCredentialsToUser(
    user,
    socialCredentials,
  );

  return { user, socialLogin };
}
