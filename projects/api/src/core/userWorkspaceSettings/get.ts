import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
import { userWorkspaceSettingsTableName } from './constants';
import { UserWorkspaceSettings } from './types';

export async function getUserWorkspaceSettingsByWorkspaceMembershipId(
  workspaceMembershipId: ID,
  options: DBOptions = {},
): Promise<UserWorkspaceSettings | null> {
  const user = await getUserWorkspaceSettingsByFromDB(
    { workspaceMembershipId },
    options,
  );

  return user;
}

export type GetUserWorkspaceSettingsByFromDBArgs = Pick<
  UserWorkspaceSettings,
  'workspaceMembershipId'
>;

async function getUserWorkspaceSettingsByFromDB(
  args: GetUserWorkspaceSettingsByFromDBArgs,
  options: DBOptions = {},
): Promise<UserWorkspaceSettings | null> {
  const query = db
    .select('*')
    .from(userWorkspaceSettingsTableName)
    .first();

  if (args.workspaceMembershipId) {
    query.where({ workspaceMembershipId: args.workspaceMembershipId });
  }

  maybeAddTransactionToQuery(query, options);

  const userWorkspaceSettings: UserWorkspaceSettings | null = await query;

  return userWorkspaceSettings;
}
