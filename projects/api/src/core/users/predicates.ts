import { User } from './types';

export function isUser(value: any): value is User {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.email &&
    value.username &&
    value.usernameIdentifier
  );
}
