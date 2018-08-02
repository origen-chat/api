export type User = Readonly<{
  id: number;

  username: string;
  usernameIdentifier: string;

  email: string;
  unverifiedEmail: string | null;

  firstName: string | null;
  lastName: string | null;

  insertedAt: number;
  updatedAt: number;
}>;

export type GetUserByArgs =
  | Readonly<{ id: number }>
  | Readonly<{ username: string; usernameIdentifier: string }>
  | Readonly<{ email: string }>;

export type InsertUserArgs = Pick<User, 'username' | 'email'> &
  Partial<Pick<User, 'firstName' | 'lastName'>>;
