import db from '../db';
import { Email, ID, Nullable } from '../types';
import { usersTableName } from './constants';
import { UniqueUsername, User } from './types';
import { getUnusedUsernameIdentifier } from './usernames';

export async function getUserById(id: ID): Promise<Nullable<User>> {
  return getUserBy({ id });
}

export async function getUserByUniqueUsername({
  username,
  usernameIdentifier,
}: UniqueUsername): Promise<Nullable<User>> {
  return getUserBy({ username, usernameIdentifier });
}

export async function getUserByEmail(email: Email): Promise<Nullable<User>> {
  return getUserBy({ email });
}

export type GetUserByArgs =
  | Readonly<{ id: ID }>
  | UniqueUsername
  | Readonly<{ email: Email }>;

async function getUserBy(args: GetUserByArgs): Promise<Nullable<User>> {
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

  const user = await db
    .insert(argsWithUsernameIdentifier)
    .into(usersTableName)
    .returning('*');

  return user;
}

export type UpdateUserArgs = Partial<
  Pick<User, 'username' | 'email' | 'unverifiedEmail'>
>;

export async function updateUser(
  user: User,
  args: UpdateUserArgs,
): Promise<User> {
  const updatedUser: User = await db(usersTableName)
    .update(args)
    .where({ id: user.id })
    .returning('*');

  return updatedUser;
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
