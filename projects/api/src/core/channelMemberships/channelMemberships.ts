import { Channel } from '../channels';
import { DBOptions } from '../types';
import { User } from '../users';
import { insertChannelMembership } from './insertion';
import { ChannelMembershipRole } from './types';

export async function addCreatorToChannel(
  channel: Channel,
  channelCreator: User,
  options: DBOptions,
): Promise<void> {
  await insertChannelMembership(
    {
      channel,
      user: channelCreator,
      role: ChannelMembershipRole.Owner,
    },
    options,
  );
}
