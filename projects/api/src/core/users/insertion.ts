import db from '../db';
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
  opts: DBOptions = {},
): Promise<User> {
  const data = await processInsertUserData(args, opts);

  const user = await doInsertUser(data);

  return user;
}

async function processInsertUserData(
  args: InsertUserArgs,
  opts: DBOptions = {},
): Promise<DoInsertUserArgs> {
  const usernameIdentifier = await getUnusedUsernameIdentifier(
    args.username,
    opts,
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
  opts: DBOptions = {},
): Promise<User> {
  const query = db
    .insert(args)
    .into(usersTableName)
    .returning('*');

  if (opts.transaction) {
    query.transacting(opts.transaction);
  }

  const [user] = await query;

  return user;
}
