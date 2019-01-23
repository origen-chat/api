import db, { maybeAddTransactionToQuery } from '../db';
import { ComparisonOperator, DBOptions } from '../types';
import { User, usersTableName } from '../users';

import { socialLoginsTableName } from './constants';
import { SocialCredentials } from './types';

export async function getUserBySocialCredentials(
  socialCredentials: SocialCredentials,
  options: DBOptions = {},
): Promise<User | null> {
  const query = db
    .select(`${usersTableName}.*`)
    .from(usersTableName)
    .innerJoin(
      socialLoginsTableName,
      `${socialLoginsTableName}.userId`,
      ComparisonOperator.Equal,
      `${usersTableName}.id`,
    )
    .where(socialCredentials)
    .first();

  maybeAddTransactionToQuery(query, options);

  const user: User | null = await query;

  return user;
}
