import { ChannelMembership } from '../channelMemberships';
import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { userChannelSettingsTableName } from './constants';
import { UserChannelSettings } from './types';

export async function getUserChannelSettingsByChannelMembership(
  channelMembership: ChannelMembership,
  options: DBOptions = {},
): Promise<UserChannelSettings | null> {
  const userChannelSettings = await getUserChannelSettingsByFromDB(
    { channelMembershipId: channelMembership.id },
    options,
  );

  return userChannelSettings;
}

type GetUserChannelSettingsByFromDBArgs = Pick<
  UserChannelSettings,
  'channelMembershipId'
>;

async function getUserChannelSettingsByFromDB(
  args: GetUserChannelSettingsByFromDBArgs,
  options: DBOptions = {},
): Promise<UserChannelSettings | null> {
  const query = db
    .select('*')
    .from(userChannelSettingsTableName)
    .first();

  if (args.channelMembershipId) {
    query.where({ channelMembershipId: args.channelMembershipId });
  }

  maybeAddTransactionToQuery(query, options);

  const userChannelSettings: UserChannelSettings | null = await query;

  return userChannelSettings;
}
