import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, Nullable } from '../types';
import { User, usersTableName } from '../users';
import { socialLoginsTableName } from './constants';
import { SocialCredentials, SocialLogin } from './types';

export async function getUserBySocialCredentials(
  socialCredentials: SocialCredentials,
  options: DBOptions = {},
): Promise<Nullable<User>> {
  const query = db
    .select(`${usersTableName}.*`)
    .from(usersTableName)
    .innerJoin(
      socialLoginsTableName,
      `${socialLoginsTableName}.userId`,
      `${usersTableName}.id`,
    )
    .where(socialCredentials)
    .first();

  maybeAddTransactionToQuery(query, options);

  const user: Nullable<User> = await query;

  return user;
}

export async function linkSocialCredentialsToUser(
  user: User,
  socialCredentials: SocialCredentials,
  options: DBOptions = {},
): Promise<SocialLogin> {
  const args: InsertSocialLoginArgs = { userId: user.id, ...socialCredentials };

  const socialLogin = await insertSocialLogin(args, options);

  return socialLogin;
}

type InsertSocialLoginArgs = Pick<
  SocialLogin,
  'userId' | 'providerUserId' | 'provider'
>;

async function insertSocialLogin(
  args: InsertSocialLoginArgs,
  options: DBOptions = {},
): Promise<SocialLogin> {
  const query = db
    .insert(args)
    .into(socialLoginsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [socialLogin] = await query;

  return socialLogin;
}
