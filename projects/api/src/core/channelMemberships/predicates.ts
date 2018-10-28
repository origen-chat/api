import { Channel } from '../channels';
import { User } from '../users';
import { getChannelMembershipByChannelAndUser } from './get';

export async function isChannelMember(
  channel: Channel,
  user: User,
): Promise<boolean> {
  const channelMembership = await getChannelMembershipByChannelAndUser(
    channel,
    user,
  );

  return !!channelMembership;
}
