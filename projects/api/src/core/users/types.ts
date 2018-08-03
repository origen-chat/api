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
