import db, { maybeAddTransactionToQuery } from '../db';
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

  maybeAddTransactionToQuery(query, options);

  const user: Nullable<User> = await query;

  return user;
}

export async function getUsersByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<User>> {
  const users = await getUsersBy({ ids }, options);

  return users;
}

export type GetUsersByArgs = Readonly<{ ids: ReadonlyArray<ID> }>;

async function getUsersBy(
  args: GetUsersByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<User>> {
  const query = db.select('*').from(usersTableName);

  if ((args as any).ids) {
    query.whereIn('id', (args as any).ids);
  }

  maybeAddTransactionToQuery(query, options);

  const users: ReadonlyArray<User> = await query;

  return users;
}
