import db from '../db';
import { Nullable } from '../types';
import { User, usersTableName } from '../users';
import { socialLoginsTableName } from './constants';
import { SocialCredentials, SocialLogin } from './types';

export async function getUserBySocialCredentials(
  socialCredentials: SocialCredentials,
): Promise<Nullable<User>> {
  const user: Nullable<User> = await db
    .select('u.*')
    .from(usersTableName)
    .as('u')
    .innerJoin(
      socialLoginsTableName,
      `${socialLoginsTableName}.userId`,
      `${usersTableName}.id`,
    )
    .where(socialCredentials)
    .first();

  return user;
}

export async function linkSocialCredentialsToUser(
  user: User,
  socialCredentials: SocialCredentials,
): Promise<SocialLogin> {
  const args: InsertSocialLoginArgs = { userId: user.id, ...socialCredentials };

  const socialLogin = await insertSocialLogin(args);

  return socialLogin;
}

type InsertSocialLoginArgs = Pick<
  SocialLogin,
  'userId' | 'providerUserId' | 'provider'
>;

async function insertSocialLogin(
  args: InsertSocialLoginArgs,
): Promise<SocialLogin> {
  const socialLogin = await db
    .insert(args)
    .into(socialLoginsTableName)
    .returning('*');

  return socialLogin;
}
