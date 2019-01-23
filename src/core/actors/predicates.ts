import { isBot } from '../bots';
import { isUser } from '../users';

import { Actor } from './types';

export function isActor(value: any): value is Actor {
  return isUser(value) || isBot(value);
}
