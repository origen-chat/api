import { doInTransaction } from '../db';
import { Reactable } from '../reactables';
import { Reaction } from '../reactions';
import { DBOptions } from '../types';
import { User } from '../users';
import { createReactableReaction } from './creation';
import { deleteReactableReaction } from './deletion';
import { getReactableReactionByAuthorReactableAndReaction } from './get';
import { publishReactableReactionToggled } from './publishers';
import { ReactableReaction } from './types';
import { validateToggleReactableReactionArgs } from './validation';

export type ToggleReactableReactionArgs = Readonly<{
  author: User;
  reactable: Reactable;
  reaction: Reaction;
}>;

export async function toggleReactableReaction(
  args: ToggleReactableReactionArgs,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  await validateToggleReactableReactionArgs(args);

  const toggledReactableReaction = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { transaction };

    const existingReactableReaction = await getReactableReactionByAuthorReactableAndReaction(
      args,
      optionsWithTransaction,
    );

    if (existingReactableReaction) {
      const deletedReactableReaction = await deleteReactableReaction(
        existingReactableReaction,
        optionsWithTransaction,
      );

      return deletedReactableReaction;
    }

    const createdReactableReaction = await createReactableReaction(
      args,
      optionsWithTransaction,
    );

    return createdReactableReaction;
  }, options);

  publishReactableReactionToggled(args);

  return toggledReactableReaction;
}
