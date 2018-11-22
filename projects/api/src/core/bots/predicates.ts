import { Bot } from './types';

export function isBot(value: any): value is Bot {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.appId &&
    value.name &&
    value.displayName
  );
}
