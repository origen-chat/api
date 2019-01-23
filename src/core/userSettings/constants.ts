import { Locale } from '../types';

import { UserSettings } from './types';

export const userSettingsTableName = 'userSettings';

export const defaultUserSettings: Pick<UserSettings, 'locale'> = {
  locale: Locale.En,
};
