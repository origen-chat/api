import { Bot } from './types';

export function isBot(object: any): object is Bot {
  return object.appId && object.name && object.displayName;
}
