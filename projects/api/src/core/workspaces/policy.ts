import { Actor } from '../actors';
import { isUser } from '../users';

export async function canCreateWorkspaces(actor: Actor): Promise<boolean> {
  if (!isUser(actor)) {
    return false;
  }

  return true;
}
