import db from '../db';
import { DBOptions } from '../types';
import { usersTableName } from './constants';
import { User } from './types';

/**
 * Deletes a user.
 */
export async function deleteUser(
  user: User,
  opts: DBOptions = {},
): Promise<User> {
  await doDeleteUser(user, opts);

  return user;
}

export async function doDeleteUser(
  user: User,
  opts: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(usersTableName)
    .where({ id: user.id });

  if (opts.transaction) {
    query.transacting(opts.transaction);
  }

  await query;
}
