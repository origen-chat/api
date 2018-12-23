import { Actor } from '../actors';
import { DBOptions } from '../types';
import { isUser } from '../users';
import { Workspace } from '../workspaces';

export type CanSeeLoadingMessagesArgs = Readonly<{
  actor: Actor;
  workspace: Workspace;
}>;

export async function canSeeLoadingMessages(
  args: CanSeeLoadingMessagesArgs,
  options: DBOptions = {},
): Promise<boolean> {
  if (!isUser(args.actor)) {
    return false;
  }

  return true;
}
