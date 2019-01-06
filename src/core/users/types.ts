import { Email, Identifiable, Timestamps } from '../types';

export type User = Readonly<{
  bio: string | null;
  avatarUrl: string | null;

  email: Email;
  unverifiedEmail: string | null;

  firstName: string | null;
  lastName: string | null;
}> &
  Identifiable &
  UniqueUsername &
  Timestamps;

export type UniqueUsername = Readonly<{
  username: string;
  usernameIdentifier: UsernameIdentifier;
}>;

export type UsernameIdentifier = string;
