import db, { doInTransaction, maybeAddTransactionToQuery } from '../db';
import { Reactable } from '../reactables';
import { Reaction } from '../reactions';
import { DBOptions } from '../types';
import { User } from '../users';
import { reactableReactionsTableName } from './constants';
import { getReactableReactionByAuthorReactableAndReaction } from './get';
import { ReactableReaction } from './types';

export type RemoveReactableReactionArgs = Readonly<{
  author: User;
  reactable: Reactable;
  reaction: Reaction;
}>;

export async function removeReactableReaction(
  args: RemoveReactableReactionArgs,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  const removedReactableReaction = await doInTransaction(
    async transaction => {
      const optionsWithTransaction: DBOptions = { transaction };

      const reactableReaction = await getReactableReactionByAuthorReactableAndReaction(
        args,
        optionsWithTransaction,
      );

      if (!reactableReaction) {
        throw new Error('reactable reaction not found');
      }

      return deleteReactableReaction(reactableReaction, options);
    },
    { transactionFromBefore: options.transaction },
  );

  return removedReactableReaction;
}

/**
 * Deletes a reactable reaction.
 */
export async function deleteReactableReaction(
  reactableReaction: ReactableReaction,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  await doDeleteReactableReaction(reactableReaction, options);

  return reactableReaction;
}

export async function doDeleteReactableReaction(
  reactableReaction: ReactableReaction,
  options: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(reactableReactionsTableName)
    .where({ id: reactableReaction.id });

  maybeAddTransactionToQuery(query, options);

  await query;
}
