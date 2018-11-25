import { Channel, NamedChannel } from '../channels';
import { DBOptions } from '../types';
import { User } from '../users';
import {
  insertChannelMembershipIntoDB,
  InsertChannelMembershipIntoDBArgs,
  insertChannelMembershipsIntoDB,
} from './creation';
import { ChannelMembership, ChannelMembershipRole } from './types';

export async function addCreatorToNamedChannel(
  namedChannel: NamedChannel,
  channelCreator: User,
  options: DBOptions = {},
): Promise<ChannelMembership> {
  const channelMembership = await addUserToNamedChannel(
    {
      namedChannel,
      user: channelCreator,
      role: ChannelMembershipRole.Owner,
    },
    options,
  );

  return channelMembership;
}

export type AddUserToNamedChannelArgs = Readonly<{
  namedChannel: NamedChannel;
}> &
  Pick<InsertChannelMembershipIntoDBArgs, 'user' | 'role'>;

export async function addUserToNamedChannel(
  args: AddUserToNamedChannelArgs,
  options: DBOptions = {},
): Promise<ChannelMembership> {
  const channelMembership = await insertChannelMembershipIntoDB(
    {
      channel: args.namedChannel,
      user: args.user,
      role: args.role,
    },
    options,
  );

  return channelMembership;
}

export type AddUsersToChannelArgs = Readonly<{
  channel: Channel;
  users: ReadonlyArray<User>;
  role: ChannelMembershipRole;
}>;

export async function addUsersToChannel(
  args: AddUsersToChannelArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<ChannelMembership>> {
  const channelMemberships = await insertChannelMembershipsIntoDB(
    args,
    options,
  );

  return channelMemberships;
}
