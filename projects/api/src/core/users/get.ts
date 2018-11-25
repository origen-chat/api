import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, Email, ID, Nullable } from '../types';
import { getCachedUser, maybeCacheUser } from './cache';
import { usersTableName } from './constants';
import { UniqueUsername, User } from './types';

export async function getUserById(
  id: ID,
  options: DBOptions = {},
): Promise<User | null> {
  const cachedUser = await getCachedUser(id);

  if (cachedUser) {
    return cachedUser;
  }

  const user = await getUserByFromDB({ id }, options);

  await maybeCacheUser(user);

  return user;
}

export type GetUserByFromDBArgs =
  | Pick<User, 'id'>
  | Pick<User, 'email'>
  | UniqueUsername;

async function getUserByFromDB(
  args: GetUserByFromDBArgs,
  options: DBOptions = {},
): Promise<User | null> {
  const query = db
    .select('*')
    .from(usersTableName)
    .where(args)
    .first();

  maybeAddTransactionToQuery(query, options);

  const user: User | null = await query;

  return user;
}

export async function getUserByUniqueUsername(
  uniqueUsername: UniqueUsername,
  options: DBOptions = {},
): Promise<User | null> {
  const user = await getUserByFromDB(uniqueUsername, options);

  await maybeCacheUser(user);

  return user;
}

export async function getUserByEmail(
  email: Email,
  options: DBOptions = {},
): Promise<Nullable<User>> {
  const user = await getUserByFromDB({ email }, options);

  await maybeCacheUser(user);

  return user;
}

export async function getUsersByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<User>> {
  const users = await getUsersByFromDB({ ids }, options);

  return users;
}

export type GetUsersByFromDBArgs = Readonly<
  | { ids: ReadonlyArray<ID>; emails?: undefined; uniqueUsernames?: undefined }
  | {
      emails: ReadonlyArray<Email>;
      ids?: undefined;
      uniqueUsernames?: undefined;
    }
  | {
      uniqueUsernames: ReadonlyArray<UniqueUsername>;
      ids?: undefined;
      emails?: undefined;
    }
>;

async function getUsersByFromDB(
  args: GetUsersByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<User>> {
  const query = db.select('*').from(usersTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  } else if (args.emails) {
    query.whereIn('email', args.emails as any);
  } else if (args.uniqueUsernames) {
    const uniqueUsernameValues = args.uniqueUsernames.map(
      (uniqueUsername: UniqueUsername) => [
        uniqueUsername.username,
        uniqueUsername.usernameIdentifier,
      ],
    );

    query.whereIn(['username', 'usernameIdentifier'], uniqueUsernameValues);
  }

  maybeAddTransactionToQuery(query, options);

  const users: ReadonlyArray<User> = await query;

  return users;
}

export async function getUsersByEmails(
  emails: ReadonlyArray<Email>,
  options: DBOptions = {},
): Promise<ReadonlyArray<User>> {
  const users = await getUsersByFromDB({ emails }, options);

  return users;
}

export async function getUsersByUniqueUsernames(
  uniqueUsernames: ReadonlyArray<UniqueUsername>,
  options: DBOptions = {},
): Promise<ReadonlyArray<User>> {
  const users = await getUsersByFromDB({ uniqueUsernames }, options);

  return users;
}
