import { User } from './types';

export function isUser(object: any): object is User {
  return (
    object.id && object.email && object.username && object.usernameIdentifier
  );
}
