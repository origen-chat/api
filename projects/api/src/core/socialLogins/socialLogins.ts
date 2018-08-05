import db from '../db';
import * as users from '../users';
import { socialLoginsTableName } from './constants';
import { SocialCredentials } from './types';

export async function getUserBySocialCredentials({
  uid,
  provider,
}: SocialCredentials): Promise<users.User | null> {
  const user = await db
    .select('*')
    .from(users.usersTableName)
    .innerJoin(
      socialLoginsTableName,
      `${socialLoginsTableName}.userId`,
      `${users.usersTableName}.id`,
    )
    .where({ uid, provider })
    .first();

  return user;
}
