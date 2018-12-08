import { Channel, NamedChannel } from '../channels';
import { DBOptions } from '../types';
import { User } from '../users';
import {
  createChannelMembership,
  CreateChannelMembershipArgs,
  createChannelMemberships,
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
  Pick<CreateChannelMembershipArgs, 'user' | 'role'>;

export async function addUserToNamedChannel(
  args: AddUserToNamedChannelArgs,
  options: DBOptions = {},
): Promise<ChannelMembership> {
  const channelMembership = await createChannelMembership(
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
  const channelMemberships = await createChannelMemberships(args, options);

  return channelMemberships;
}
