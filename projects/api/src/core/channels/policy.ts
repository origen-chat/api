import { User } from '../users';
import { Channel } from './types';

export function canSeeChannel(user: User, channel: Channel): boolean {
  return true;
}
