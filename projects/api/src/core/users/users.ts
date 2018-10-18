import db from '../db';
import { DBOptions, Email, ID, Nullable } from '../types';
import { usersTableName } from './constants';
import { UniqueUsername, User } from './types';

export async function getUserById(id: ID): Promise<Nullable<User>> {
  const user = await getUserBy({ id });

  return user;
}

export async function getUserByUniqueUsername(
  uniqueUsername: UniqueUsername,
  opts: DBOptions = {},
): Promise<Nullable<User>> {
  const user = await getUserBy(uniqueUsername, opts);

  return user;
}

export async function getUserByEmail(
  email: Email,
  opts: DBOptions = {},
): Promise<Nullable<User>> {
  const user = await getUserBy({ email }, opts);

  return user;
}

export type GetUserByArgs =
  | Pick<User, 'id'>
  | Pick<User, 'email'>
  | UniqueUsername;

async function getUserBy(
  args: GetUserByArgs,
  opts: DBOptions = {},
): Promise<Nullable<User>> {
  const query = db
    .select('*')
    .from(usersTableName)
    .where(args)
    .first();

  if (opts.transaction) {
    query.transacting(opts.transaction);
  }

  const user: Nullable<User> = await query;

  return user;
}
