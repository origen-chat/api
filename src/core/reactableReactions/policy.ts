import { User } from '../users';

import { ToggleReactableReactionArgs } from './reactableReactions';

export function canUserToggleReactableReaction(
  user: User,
  args: ToggleReactableReactionArgs,
): boolean {
  if (user.id === args.author.id) {
    return true;
  }

  return false;
}
