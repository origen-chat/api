import { UserWorkspaceSettings } from './types';

export const userWorkspaceSettingsTableName = 'userWorkspaceSettings';

export const defaultUserWorkspaceSettings: Pick<
  UserWorkspaceSettings,
  'doNotDisturbFrom' | 'doNotDisturbTo'
> = {
  doNotDisturbFrom: '20:00:00',
  doNotDisturbTo: '08:00:00',
};
