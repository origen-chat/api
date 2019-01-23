import { ChannelMembership } from '../channelMemberships';
import { insertIntoDB } from '../db';
import { DBOptions } from '../types';

import {
  defaultUserChannelSettings,
  userChannelSettingsTableName,
} from './constants';
import { UserChannelSettings } from './types';

export type CreateManyUserChannelSettingsArgs = InsertManyUserChannelSettingsIntoDBArgs;

export async function createManyUserChannelSettings(
  args: CreateManyUserChannelSettingsArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserChannelSettings>> {
  const userChannelSettings = await insertManyUserChannelSettingsIntoDB(
    args,
    options,
  );

  return userChannelSettings;
}

type InsertManyUserChannelSettingsIntoDBArgs = Readonly<{
  channelMemberships: ReadonlyArray<ChannelMembership>;
}>;

async function insertManyUserChannelSettingsIntoDB(
  args: InsertManyUserChannelSettingsIntoDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserChannelSettings>> {
  const doInsertManyUserChannelSettingsIntoDBArgs = makeDoInsertManyUserChannelSettingsIntoDBArgs(
    args,
  );

  const userChannelSettings = await doInsertManyUserSettingsIntoDB(
    doInsertManyUserChannelSettingsIntoDBArgs,
    options,
  );

  return userChannelSettings;
}

function makeDoInsertManyUserChannelSettingsIntoDBArgs(
  args: InsertManyUserChannelSettingsIntoDBArgs,
): DoInsertManyUserSettingsIntoDBArgs {
  const doInsertManyUserSettingsIntoDBArgs: DoInsertManyUserSettingsIntoDBArgs = args.channelMemberships.map(
    channelMembership => ({
      channelMembershipId: channelMembership.id,
      muted: defaultUserChannelSettings.muted,
    }),
  );

  return doInsertManyUserSettingsIntoDBArgs;
}

type DoInsertManyUserSettingsIntoDBArgs = ReadonlyArray<
  Pick<UserChannelSettings, 'channelMembershipId' | 'muted'>
>;

async function doInsertManyUserSettingsIntoDB(
  args: DoInsertManyUserSettingsIntoDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserChannelSettings>> {
  const userSettings = await insertIntoDB(
    { data: args, tableName: userChannelSettingsTableName },
    options,
  );

  return userSettings;
}
