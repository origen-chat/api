import { Bot, isBot } from '../bots';
import { Channel } from '../channels';
import { DBOptions } from '../types';
import { User } from '../users';
import { getChannelMembershipByChannelAndUser } from './get';

export async function isChannelMember(
  channel: Channel,
  userOrBot: User | Bot,
  options: DBOptions = {},
): Promise<boolean> {
  if (isBot(userOrBot)) {
    // const bot = userOrBot;
    return false;
  }

  const user = userOrBot;

  const channelMembership = await getChannelMembershipByChannelAndUser(
    channel,
    user,
    options,
  );

  return !!channelMembership;
}
