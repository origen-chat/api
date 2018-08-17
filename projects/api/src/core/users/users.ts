import db from '../db';
import { Nullable } from '../types';
import { usersTableName } from './constants';
import { UniqueUsername, User } from './types';
import { getUnusedUsernameIdentifier } from './usernames';

export async function getUserById(id: number): Promise<User | null> {
  return getUserBy({ id });
}

export type GetUserByUniqueUsernameArgs = Readonly<UniqueUsername>;

export async function getUserByUniqueUsername({
  username,
  usernameIdentifier,
}: GetUserByUniqueUsernameArgs): Promise<User | null> {
  return getUserBy({ username, usernameIdentifier });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return getUserBy({ email });
}

export type GetUserByArgs =
  | Readonly<{ id: number }>
  | Readonly<UniqueUsername>
  | Readonly<{ email: string }>;

async function getUserBy(args: GetUserByArgs): Promise<User | null> {
  const user: User | null = await db
    .select('*')
    .from(usersTableName)
    .where(args)
    .first();

  return user;
}

export type InsertUserArgs = Pick<User, 'username' | 'email'> &
  Partial<Pick<User, 'firstName' | 'lastName'>>;

export async function insertUser(args: InsertUserArgs): Promise<User> {
  const usernameIdentifier = await getUnusedUsernameIdentifier(args.username);

  const argsWithUsernameIdentifier: InsertUserArgs &
    Pick<User, 'usernameIdentifier'> = { ...args, usernameIdentifier };

  const user = await db(usersTableName).insert(argsWithUsernameIdentifier, '*');

  return user;
}

export type UpdateUserArgs = {
  username?: string;
  email?: string;
  unverifiedEmail?: Nullable<string>;
};

export async function updateUser(
  user: User,
  args: UpdateUserArgs,
): Promise<User> {
  const data = { ...args };

  return db(usersTableName)
    .where({ id: user.id })
    .update(data, '*');
}

export async function verifyEmail(user: User): Promise<User> {
  if (!user.unverifiedEmail) {
    throw new Error("user doesn't have an unverified email to verify");
  }

  const data: UpdateUserArgs = {
    email: user.unverifiedEmail,
    unverifiedEmail: null,
  };

  return updateUser(user, data);
}
