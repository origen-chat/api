import { Email, Identifiable, Timestamps } from '../types';

export type User = Readonly<{
  bio: string | null;
  avatarUrl: string | null;

  email: Email;
  unverifiedEmail: string | null;

  firstName: string | null;
  lastName: string | null;

  locale: Locale;
}> &
  Identifiable &
  UniqueUsername &
  Timestamps;

export enum Locale {
  En = 'en',
}

export type UniqueUsername = Readonly<{
  username: string;
  usernameIdentifier: UsernameIdentifier;
}>;

export type UsernameIdentifier = string;
