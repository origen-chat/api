import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { usersTableName } from './constants';
import { User } from './types';
import { getUnusedUsernameIdentifier } from './usernames';

export type InsertUserArgs = Pick<User, 'username' | 'email'> &
  Partial<Pick<User, 'firstName' | 'lastName'>>;

/**
 * Inserts a user.
 */
export async function insertUser(
  args: InsertUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const data = await processInsertUserData(args, options);

  const user = await doInsertUser(data);

  return user;
}

async function processInsertUserData(
  args: InsertUserArgs,
  options: DBOptions = {},
): Promise<DoInsertUserArgs> {
  const usernameIdentifier = await getUnusedUsernameIdentifier(
    args.username,
    options,
  );

  const data: DoInsertUserArgs = {
    ...args,
    usernameIdentifier,
  };

  return data;
}

export type DoInsertUserArgs = Pick<
  User,
  'username' | 'usernameIdentifier' | 'email'
> &
  Partial<Pick<User, 'firstName' | 'lastName'>>;

export async function doInsertUser(
  args: DoInsertUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const query = db
    .insert(args)
    .into(usersTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [user] = await query;

  return user;
}
