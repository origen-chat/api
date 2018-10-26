import { omit } from 'ramda';

import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, Mutable } from '../types';
import { usersTableName } from './constants';
import { User } from './types';
import { getUnusedUsernameIdentifier } from './usernames';

export type UpdateUserArgs = Partial<Pick<User, 'username' | 'email'>>;

/**
 * Updates a user.
 */
export async function updateUser(
  user: User,
  args: UpdateUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const data = await processUpdateUserData(args, options);

  const updatedUser = await doUpdateUser(user, data, options);

  return updatedUser;
}

async function processUpdateUserData(
  args: UpdateUserArgs,
  options: DBOptions = {},
): Promise<DoUpdateUserArgs> {
  const data: Mutable<DoUpdateUserArgs> = omit(['email'], args);

  if (args.email) {
    data.unverifiedEmail = args.email;
  }

  if (args.username) {
    data.usernameIdentifier = await getUnusedUsernameIdentifier(
      args.username,
      options,
    );
  }

  return data;
}

export type DoUpdateUserArgs = Partial<
  Pick<User, 'username' | 'usernameIdentifier' | 'email' | 'unverifiedEmail'>
>;

export async function doUpdateUser(
  user: User,
  args: DoUpdateUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const query = db(usersTableName)
    .update(args)
    .where({ id: user.id })
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [updatedUser] = await query;

  return updatedUser;
}
