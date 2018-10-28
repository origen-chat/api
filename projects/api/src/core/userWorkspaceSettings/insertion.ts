import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { WorkspaceMembership } from '../workspaceMemberships';
import {
  defaultUserWorkspaceSettingsConfiguration,
  userWorkspaceSettingsTableName,
} from './constants';
import { UserWorkspaceSettings } from './types';

export type InsertUserWorkspaceSettingsArgs = Readonly<{
  workspaceMembership: WorkspaceMembership;
}> &
  Partial<Pick<UserWorkspaceSettings, 'configuration'>>;

export async function insertUserWorkspaceSettings(
  args: InsertUserWorkspaceSettingsArgs,
  options: DBOptions = {},
): Promise<UserWorkspaceSettings> {
  const doInsertUserWorkspaceSettingsArgs = makeDoInsertUserWorkspaceSettingsArgs(
    args,
  );

  const userWorkspaceSettings = await doInsertUserWorkspaceSettings(
    doInsertUserWorkspaceSettingsArgs,
    options,
  );

  return userWorkspaceSettings;
}

function makeDoInsertUserWorkspaceSettingsArgs(
  args: InsertUserWorkspaceSettingsArgs,
): DoInsertUserWorkspaceSettingsArgs {
  const doInsertUserWorkspaceSettingsArgs: DoInsertUserWorkspaceSettingsArgs = {
    workspaceMembershipId: args.workspaceMembership.id,
    configuration:
      args.configuration || defaultUserWorkspaceSettingsConfiguration,
  };

  return doInsertUserWorkspaceSettingsArgs;
}

export type DoInsertUserWorkspaceSettingsArgs = Pick<
  UserWorkspaceSettings,
  'workspaceMembershipId' | 'configuration'
>;

export async function doInsertUserWorkspaceSettings(
  args: DoInsertUserWorkspaceSettingsArgs,
  options: DBOptions = {},
): Promise<UserWorkspaceSettings> {
  const query = db
    .insert(args)
    .into(userWorkspaceSettingsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [userWorkspaceSettings] = await query;

  return userWorkspaceSettings;
}
