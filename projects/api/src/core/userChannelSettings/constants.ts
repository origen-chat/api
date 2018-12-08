import { UserChannelSettings } from './types';

export const userChannelSettingsTableName = 'userChannelSettings';

export const defaultUserChannelSettings: Pick<UserChannelSettings, 'muted'> = {
  muted: false,
};
