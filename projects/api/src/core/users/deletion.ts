import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { usersTableName } from './constants';
import { User } from './types';

/**
 * Deletes a user.
 */
export async function deleteUser(
  user: User,
  options: DBOptions = {},
): Promise<User> {
  await doDeleteUser(user, options);

  return user;
}

export async function doDeleteUser(
  user: User,
  options: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(usersTableName)
    .where({ id: user.id });

  maybeAddTransactionToQuery(query, options);

  await query;
}
