import { User } from '../users';
import { isPublicChannel } from './predicates';
import { Channel } from './types';

export async function canSeeChannel(
  user: User,
  channel: Channel,
): Promise<boolean> {
  if (isPublicChannel(channel)) {
    return true;
  }

  return true;
}
