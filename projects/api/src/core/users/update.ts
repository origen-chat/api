import db, { doInTransaction, maybeAddTransactionToQuery } from '../db';
import { DBOptions, Mutable } from '../types';
import { cacheUser } from './cache';
import { usersTableName } from './constants';
import { User } from './types';
import { getUnusedUsernameIdentifier } from './usernames';

export type UpdateUserArgs = UpdateUserInDBArgs;

export async function updateUser(
  user: User,
  args: UpdateUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const updatedUser = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { transaction };

    const updateUserInDBArgs: Mutable<UpdateUserInDBArgs> = {
      ...args,
    };

    if (updateUserInDBArgs.username && !updateUserInDBArgs.usernameIdentifier) {
      updateUserInDBArgs.usernameIdentifier = await getUnusedUsernameIdentifier(
        updateUserInDBArgs.username,
        options,
      );
    }

    // eslint-disable-next-line no-underscore-dangle
    const _updatedUser = await updateUserInDB(
      user,
      args,
      optionsWithTransaction,
    );

    return _updatedUser;
  }, options);

  await cacheUser(updatedUser);

  return updatedUser;
}

export type UpdateUserInDBArgs = DoUpdateUserInDBArgs;

export async function updateUserInDB(
  user: User,
  args: UpdateUserInDBArgs,
  options: DBOptions = {},
): Promise<User> {
  const updatedUser = await doUpdateUserInDB(user, args, options);

  return updatedUser;
}

export type DoUpdateUserInDBArgs = Partial<
  Pick<
    User,
    | 'username'
    | 'usernameIdentifier'
    | 'email'
    | 'unverifiedEmail'
    | 'firstName'
    | 'lastName'
    | 'bio'
    | 'avatarUrl'
  >
>;

export async function doUpdateUserInDB(
  user: User,
  args: DoUpdateUserInDBArgs,
  options: DBOptions = {},
): Promise<User> {
  const data = {
    ...args,
    updatedAt: new Date().toISOString(),
  };

  const query = db(usersTableName)
    .update(data)
    .where({ id: user.id })
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [updatedUser] = await query;

  return updatedUser;
}
