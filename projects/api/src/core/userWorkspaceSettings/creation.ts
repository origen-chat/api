import { insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { WorkspaceMembership } from '../workspaceMemberships';
import {
  defaultUserWorkspaceSettingsConfiguration,
  userWorkspaceSettingsTableName,
} from './constants';
import { UserWorkspaceSettings } from './types';

export type CreateUserWorkspaceSettingsArgs = InsertUserWorkspaceSettingsIntoDBArgs;

export async function createUserWorkspaceSettings(
  args: CreateUserWorkspaceSettingsArgs,
  options: DBOptions = {},
): Promise<UserWorkspaceSettings> {
  const userWorkspaceSettings = await insertUserWorkspaceSettingsIntoDB(
    args,
    options,
  );

  return userWorkspaceSettings;
}

export type InsertUserWorkspaceSettingsIntoDBArgs = Readonly<{
  workspaceMembership: WorkspaceMembership;
}> &
  Partial<Pick<UserWorkspaceSettings, 'configuration'>>;

export async function insertUserWorkspaceSettingsIntoDB(
  args: InsertUserWorkspaceSettingsIntoDBArgs,
  options: DBOptions = {},
): Promise<UserWorkspaceSettings> {
  const doInsertUserWorkspaceSettingsIntoDBArgs = makeDoInsertUserWorkspaceSettingsIntoDBArgs(
    args,
  );

  const userWorkspaceSettings = await doInsertUserWorkspaceSettingsIntoDB(
    doInsertUserWorkspaceSettingsIntoDBArgs,
    options,
  );

  return userWorkspaceSettings;
}

function makeDoInsertUserWorkspaceSettingsIntoDBArgs(
  args: InsertUserWorkspaceSettingsIntoDBArgs,
): DoInsertUserWorkspaceSettingsIntoDBArgs {
  const doInsertUserWorkspaceSettingsIntoDBArgs: DoInsertUserWorkspaceSettingsIntoDBArgs = {
    workspaceMembershipId: args.workspaceMembership.id,
    configuration:
      args.configuration || defaultUserWorkspaceSettingsConfiguration,
  };

  return doInsertUserWorkspaceSettingsIntoDBArgs;
}

export type DoInsertUserWorkspaceSettingsIntoDBArgs = Pick<
  UserWorkspaceSettings,
  'workspaceMembershipId' | 'configuration'
>;

export async function doInsertUserWorkspaceSettingsIntoDB(
  args: DoInsertUserWorkspaceSettingsIntoDBArgs,
  options: DBOptions = {},
): Promise<UserWorkspaceSettings> {
  const userWorkspaceSettings = await insertIntoDB(
    { data: args, tableName: userWorkspaceSettingsTableName },
    options,
  );

  return userWorkspaceSettings;
}
