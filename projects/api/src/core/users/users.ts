import db from '../db';
import { usersTableName } from './constants';
import { GetUserByArgs, InsertUserArgs, User } from './types';
import { getUnusedUsernameIdentifier } from './usernames';

export function getUserById(id: number): Promise<User | null> {
  return getUserBy({ id });
}

export async function getUserByUsernameAndUsernameIdentifier(
  username: string,
  usernameIdentifier: string,
): Promise<User | null> {
  return getUserBy({ username, usernameIdentifier });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return getUserBy({ email });
}

async function getUserBy(args: GetUserByArgs): Promise<User | null> {
  const user: User | null = await db
    .select('*')
    .from(usersTableName)
    .where(args)
    .first();

  return user;
}

export async function insertUser(args: InsertUserArgs): Promise<User> {
  const usernameIdentifier = await getUnusedUsernameIdentifier(args.username);

  const argsWithUsernameIdentifier: InsertUserArgs &
    Pick<User, 'usernameIdentifier'> = { ...args, usernameIdentifier };

  const user = await db(usersTableName).insert(argsWithUsernameIdentifier, '*');

  return user;
}
