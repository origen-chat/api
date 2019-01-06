import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { userSettingsTableName } from './constants';
import { UserSettings } from './types';

export async function getUserSettingsByUser(
  user: User,
  options: DBOptions = {},
): Promise<UserSettings | null> {
  const userSettings = await getUserSettingsByFromDB(
    { userId: user.id },
    options,
  );

  return userSettings;
}

type GetUserSettingsByFromDBArgs = Pick<UserSettings, 'userId'>;

async function getUserSettingsByFromDB(
  args: GetUserSettingsByFromDBArgs,
  options: DBOptions = {},
): Promise<UserSettings | null> {
  const query = db
    .select('*')
    .from(userSettingsTableName)
    .first();

  if (args.userId) {
    query.where({ userId: args.userId });
  }

  maybeAddTransactionToQuery(query, options);

  const userSettings: UserSettings | null = await query;

  return userSettings;
}
