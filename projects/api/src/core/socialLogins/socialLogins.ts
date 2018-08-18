import db from '../db';
import { Nullable } from '../types';
import { User, usersTableName } from '../users';
import { socialLoginsTableName } from './constants';
import { SocialCredentials } from './types';

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
