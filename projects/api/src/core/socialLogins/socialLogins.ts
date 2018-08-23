import db from '../db';
import { DBOptions, Nullable } from '../types';
import { User, usersTableName } from '../users';
import { socialLoginsTableName } from './constants';
import { SocialCredentials, SocialLogin } from './types';

export async function getUserBySocialCredentials(
  socialCredentials: SocialCredentials,
): Promise<Nullable<User>> {
  const user: Nullable<User> = await db
    .select('users.*')
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
  opts: DBOptions = {},
): Promise<SocialLogin> {
  const args: InsertSocialLoginArgs = { userId: user.id, ...socialCredentials };

  const socialLogin = await insertSocialLogin(args, opts);

  return socialLogin;
}

type InsertSocialLoginArgs = Pick<
  SocialLogin,
  'userId' | 'providerUserId' | 'provider'
>;

async function insertSocialLogin(
  args: InsertSocialLoginArgs,
  opts: DBOptions = {},
): Promise<SocialLogin> {
  const query = db
    .insert(args)
    .into(socialLoginsTableName)
    .returning('*');

  if (opts.transaction) {
    query.transacting(opts.transaction);
  }

  const [socialLogin] = await query;

  return socialLogin;
}
