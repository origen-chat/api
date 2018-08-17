import { Identifiable, Nullable, Timestamps } from '../types';

export type User = Readonly<{
  bio: Nullable<string>;
  avatarUrl: Nullable<string>;

  email: string;
  unverifiedEmail: Nullable<string>;

  firstName: Nullable<string>;
  lastName: Nullable<string>;
}> &
  Identifiable &
  UniqueUsername &
  Timestamps;

export type UniqueUsername = Readonly<{
  username: string;
  usernameIdentifier: UsernameIdentifier;
}>;

export type UsernameIdentifier = string;
