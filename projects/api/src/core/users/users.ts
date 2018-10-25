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
  options: DBOptions = {},
): Promise<Nullable<User>> {
  const user = await getUserBy(uniqueUsername, options);

  return user;
}

export async function getUserByEmail(
  email: Email,
  options: DBOptions = {},
): Promise<Nullable<User>> {
  const user = await getUserBy({ email }, options);

  return user;
}

export type GetUserByArgs =
  | Pick<User, 'id'>
  | Pick<User, 'email'>
  | UniqueUsername;

async function getUserBy(
  args: GetUserByArgs,
  options: DBOptions = {},
): Promise<Nullable<User>> {
  const query = db
    .select('*')
    .from(usersTableName)
    .where(args)
    .first();

  if (options.transaction) {
    query.transacting(options.transaction);
  }

  const user: Nullable<User> = await query;

  return user;
}
