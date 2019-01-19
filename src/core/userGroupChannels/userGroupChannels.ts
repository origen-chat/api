import { DBOptions } from '../types';
import { UserGroupChannel } from './types';
import {
  createUserGroupChannels,
  CreateUserGroupChannelsArgs,
} from './creation';
import { UserGroup } from '../userGroups';
import { NamedChannel } from '../channels';

export type AddChannelToUserGroupArgs = Readonly<{
  channel: NamedChannel;
  userGroup: UserGroup;
}>;

export async function addChannelToUserGroup(
  args: AddChannelToUserGroupArgs,
  options: DBOptions = {},
): Promise<UserGroupChannel> {
  const [userGroupChannel] = await addChannelsToUserGroup(
    {
      userGroup: args.userGroup,
      channels: [args.channel],
    },
    options,
  );

  return userGroupChannel;
}

export type AddChannelsToUserGroupArgs = CreateUserGroupChannelsArgs;

export async function addChannelsToUserGroup(
  args: AddChannelsToUserGroupArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserGroupChannel>> {
  const userGroupChannels = await createUserGroupChannels(args, options);

  return userGroupChannels;
}
