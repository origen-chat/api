import { insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { WorkspaceMembership } from '../workspaceMemberships';

import {
  defaultUserWorkspaceSettings,
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

type InsertUserWorkspaceSettingsIntoDBArgs = Readonly<{
  workspaceMembership: WorkspaceMembership;
}> &
  Partial<Pick<UserWorkspaceSettings, 'doNotDisturbFrom' | 'doNotDisturbTo'>>;

async function insertUserWorkspaceSettingsIntoDB(
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
    doNotDisturbFrom:
      args.doNotDisturbFrom || defaultUserWorkspaceSettings.doNotDisturbFrom,
    doNotDisturbTo:
      args.doNotDisturbTo || defaultUserWorkspaceSettings.doNotDisturbTo,
  };

  return doInsertUserWorkspaceSettingsIntoDBArgs;
}

type DoInsertUserWorkspaceSettingsIntoDBArgs = Pick<
  UserWorkspaceSettings,
  'workspaceMembershipId' | 'doNotDisturbFrom' | 'doNotDisturbTo'
>;

async function doInsertUserWorkspaceSettingsIntoDB(
  args: DoInsertUserWorkspaceSettingsIntoDBArgs,
  options: DBOptions = {},
): Promise<UserWorkspaceSettings> {
  const userWorkspaceSettings = await insertIntoDB(
    { data: args, tableName: userWorkspaceSettingsTableName },
    options,
  );

  return userWorkspaceSettings;
}
