import { isChannelMember } from '../channelMemberships/predicates';
import { getChannelById } from '../channels';
import { doInTransaction } from '../db';
import { isMessage } from '../messages';
import { Reactable } from '../reactables';
import { Reaction } from '../reactions';
import { DBOptions } from '../types';
import { User } from '../users';
import { deleteReactableReaction } from './deletion';
import { getReactableReactionByAuthorReactableAndReaction } from './get';
import { insertReactableReaction } from './insertion';
import { publishReactableReactionToggled } from './publishers';
import { ReactableReaction } from './types';

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

  const toggledReactableReaction = await doInTransaction(
    async transaction => {
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

      const insertedReactableReaction = await insertReactableReaction(
        args,
        optionsWithTransaction,
      );

      return insertedReactableReaction;
    },
    { transactionFromBefore: options.transaction },
  );

  publishReactableReactionToggled(args);

  return toggledReactableReaction;
}

async function validateToggleReactableReactionArgs(
  args: ToggleReactableReactionArgs,
): Promise<void> {
  if (isMessage(args.reactable)) {
    const channel = (await getChannelById(args.reactable.channelId))!;

    if (!(await isChannelMember(channel, args.author))) {
      throw new Error('user is not a member of the channel');
    }
  }
}
