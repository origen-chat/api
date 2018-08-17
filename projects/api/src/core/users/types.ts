import { Identifiable, Nullable, Timestamps } from '../types';

export type User = Readonly<{
  username: string;
  usernameIdentifier: string;

  bio: Nullable<string>;
  avatarUrl: Nullable<string>;

  email: string;
  unverifiedEmail: Nullable<string>;

  firstName: Nullable<string>;
  lastName: Nullable<string>;
}> &
  Identifiable &
  Timestamps;
