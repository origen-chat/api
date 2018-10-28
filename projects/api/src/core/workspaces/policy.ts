import { User } from '../users';

export async function canCreateWorkspaces(user: User): Promise<boolean> {
  return true;
}
