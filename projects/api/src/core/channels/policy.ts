import { Actor } from '../actors';
import { isPublicChannel } from './predicates';
import { Channel } from './types';

export async function canSeeChannel(
  actor: Actor,
  channel: Channel,
): Promise<boolean> {
  if (isPublicChannel(channel)) {
    return true;
  }

  return true;
}
