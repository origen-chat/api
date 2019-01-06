import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { UserWorkspaceMembership } from '../workspaceMemberships/types';
import { userWorkspaceSettingsTableName } from './constants';
import { UserWorkspaceSettings } from './types';

export async function getUserWorkspaceSettingsByWorkspaceMembership(
  workspaceMembership: UserWorkspaceMembership,
  options: DBOptions = {},
): Promise<UserWorkspaceSettings | null> {
  const userWorkspaceSettings = await getUserWorkspaceSettingsByFromDB(
    { workspaceMembershipId: workspaceMembership.id },
    options,
  );

  return userWorkspaceSettings;
}

type GetUserWorkspaceSettingsByFromDBArgs = Pick<
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
