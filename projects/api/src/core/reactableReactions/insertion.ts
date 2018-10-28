import db, { maybeAddTransactionToQuery } from '../db';
import { Message } from '../messages';
import { Reaction } from '../reactions';
import { DBOptions } from '../types';
import { User } from '../users';
import { reactableReactionsTableName } from './constants';
import { ReactableReaction } from './types';

export type InsertReactableReactionArgs = Readonly<{
  message: Message;
}> &
  Readonly<{ author: User; reaction: Reaction }>;

/**
 * Inserts a reactable reaction.
 */
export async function insertReactableReaction(
  args: InsertReactableReactionArgs,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  const doInsertReactableReactionArgs = makeDoInsertReactableReactionArgs(args);

  const reactableReaction = await doInsertReactableReaction(
    doInsertReactableReactionArgs,
    options,
  );

  return reactableReaction;
}

function makeDoInsertReactableReactionArgs(
  args: InsertReactableReactionArgs,
): DoInsertReactableReactionArgs {
  const doInsertReactableReactionArgs: DoInsertReactableReactionArgs = {
    reactionId: args.reaction.id,
    messageId: args.message.id,
    authorId: args.author.id,
  };

  return doInsertReactableReactionArgs;
}

export type DoInsertReactableReactionArgs = Pick<
  ReactableReaction,
  'reactionId' | 'messageId' | 'authorId'
>;

export async function doInsertReactableReaction(
  args: DoInsertReactableReactionArgs,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  const query = db
    .insert(args)
    .into(reactableReactionsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [reactableReaction] = await query;

  return reactableReaction;
}
