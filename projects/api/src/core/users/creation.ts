import { doInTransaction, insertIntoDB } from '../db';
import { DBOptions, Mutable } from '../types';
import { createUserSettings } from '../userSettings';
import { usersTableName } from './constants';
import { User } from './types';
import { getUnusedUsernameIdentifier } from './usernames';

export type CreateUserArgs = Pick<
  InsertUserIntoDBArgs,
  'username' | 'email' | 'firstName' | 'lastName'
> &
  Partial<Pick<InsertUserIntoDBArgs, 'usernameIdentifier'>>;

export async function createUser(
  args: CreateUserArgs,
  options: DBOptions = {},
): Promise<User> {
  const createdUser = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    const insertUserIntoDBArgs: Mutable<Partial<InsertUserIntoDBArgs>> = {
      ...args,
    };

    if (!insertUserIntoDBArgs.usernameIdentifier) {
      insertUserIntoDBArgs.usernameIdentifier = await getUnusedUsernameIdentifier(
        args.username,
        optionsWithTransaction,
      );
    }

    const user = await insertUserIntoDB(
      insertUserIntoDBArgs as InsertUserIntoDBArgs,
      optionsWithTransaction,
    );

    await createUserSettings({ user }, optionsWithTransaction);

    return user;
  }, options);

  return createdUser;
}

type InsertUserIntoDBArgs = Pick<
  User,
  'username' | 'usernameIdentifier' | 'email'
> &
  Partial<Pick<User, 'firstName' | 'lastName'>>;

async function insertUserIntoDB(
  args: InsertUserIntoDBArgs,
  options: DBOptions = {},
): Promise<User> {
  const user = await doInsertUserIntoDB(args, options);

  return user;
}

export type DoInsertUserIntoDBArgs = Pick<
  User,
  'username' | 'usernameIdentifier' | 'email'
> &
  Partial<Pick<User, 'firstName' | 'lastName'>>;

export async function doInsertUserIntoDB(
  args: DoInsertUserIntoDBArgs,
  options: DBOptions = {},
): Promise<User> {
  const user = await insertIntoDB(
    { data: args, tableName: usersTableName },
    options,
  );

  return user;
}
