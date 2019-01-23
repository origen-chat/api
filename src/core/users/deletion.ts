import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';

import { usersTableName } from './constants';
import { User } from './types';

export async function deleteUser(
  user: User,
  options: DBOptions = {},
): Promise<User> {
  await deleteUserFromDB(user, options);

  return user;
}

export async function deleteUserFromDB(
  user: User,
  options: DBOptions = {},
): Promise<User> {
  await doDeleteUserFromDB(user, options);

  return user;
}

export async function doDeleteUserFromDB(
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
