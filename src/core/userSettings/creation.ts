import { ColorTheme, getDefaultColorTheme } from '../colorThemes';
import { insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { defaultUserSettings, userSettingsTableName } from './constants';
import { UserSettings } from './types';

export type CreateUserSettingsArgs = InsertUserSettingsIntoDBArgs;

export async function createUserSettings(
  args: CreateUserSettingsArgs,
  options: DBOptions = {},
): Promise<UserSettings> {
  const defaultColorTheme = await getDefaultColorTheme();

  const argsWithDefaultColorTheme: InsertUserSettingsIntoDBArgs = {
    ...args,
    colorTheme: defaultColorTheme,
  };

  const userSettings = await insertUserSettingsIntoDB(
    argsWithDefaultColorTheme,
    options,
  );

  return userSettings;
}

type InsertUserSettingsIntoDBArgs = Readonly<{
  user: User;
  colorTheme: ColorTheme;
}> &
  Partial<Pick<UserSettings, 'locale' | 'timezone'>>;

async function insertUserSettingsIntoDB(
  args: InsertUserSettingsIntoDBArgs,
  options: DBOptions = {},
): Promise<UserSettings> {
  const doInsertUserSettingsIntoDBArgs = makeDoInsertUserSettingsIntoDBArgs(
    args,
  );

  const userSettings = await doInsertUserSettingsIntoDB(
    doInsertUserSettingsIntoDBArgs,
    options,
  );

  return userSettings;
}

function makeDoInsertUserSettingsIntoDBArgs(
  args: InsertUserSettingsIntoDBArgs,
): DoInsertUserSettingsIntoDBArgs {
  const doInsertUserSettingsIntoDBArgs: DoInsertUserSettingsIntoDBArgs = {
    userId: args.user.id,
    locale: args.locale || defaultUserSettings.locale,
    timezone: args.timezone || null,
    colorThemeId: args.colorTheme.id,
  };

  return doInsertUserSettingsIntoDBArgs;
}

type DoInsertUserSettingsIntoDBArgs = Pick<
  UserSettings,
  'userId' | 'locale' | 'timezone' | 'colorThemeId'
>;

async function doInsertUserSettingsIntoDB(
  args: DoInsertUserSettingsIntoDBArgs,
  options: DBOptions = {},
): Promise<UserSettings> {
  const userSettings = await insertIntoDB(
    { data: args, tableName: userSettingsTableName },
    options,
  );

  return userSettings;
}
