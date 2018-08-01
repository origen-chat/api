export type UsernameIdentifier = string;

export type User = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  usernameIdentifier: UsernameIdentifier;
  email: string;
};
