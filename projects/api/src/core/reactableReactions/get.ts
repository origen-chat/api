import db, { maybeAddTransactionToQuery } from '../db';
import { Reactable } from '../reactables';
import { Reaction } from '../reactions';
import { DBOptions, ID } from '../types';
import { User } from '../users';
import { reactableReactionsTableName } from './constants';
import { ReactableReaction } from './types';

export async function getReactableReactionById(
  id: ID,
  options: DBOptions = {},
): Promise<ReactableReaction | null> {
  const reactableReaction = await getReactableReactionByFromDB({ id }, options);

  return reactableReaction;
}

export type GetReactableReactionByFromDBArgs = Readonly<
  | {
      id: ID;
      authorId?: undefined;
      messageId?: undefined;
      reactionId?: undefined;
    }
  | {
      authorId: ID;
      messageId: ID;
      reactionId: ID;
      id?: undefined;
    }
>;

export async function getReactableReactionByFromDB(
  args: GetReactableReactionByFromDBArgs,
  options: DBOptions = {},
): Promise<ReactableReaction | null> {
  const query = db
    .select('*')
    .from(reactableReactionsTableName)
    .first();

  if (args.id) {
    query.where({ id: args.id });
  } else if (args.authorId) {
    query.where({
      authorId: args.authorId,
      messageId: args.messageId && args.messageId,
      reactionId: args.reactionId,
    });
  }

  maybeAddTransactionToQuery(query, options);

  const reactableReaction: ReactableReaction | null = await query;

  return reactableReaction;
}

export type GetReactableReactionByAuthorReactableAndReactionArgs = Readonly<{
  author: User;
  reactable: Reactable;
  reaction: Reaction;
}>;

export async function getReactableReactionByAuthorReactableAndReaction(
  args: GetReactableReactionByAuthorReactableAndReactionArgs,
  options: DBOptions = {},
): Promise<ReactableReaction | null> {
  const getReactableReactionByFromDBArgs: GetReactableReactionByFromDBArgs = {
    authorId: args.author.id,
    messageId: args.reactable.id,
    reactionId: args.reaction.id,
  };

  const reactableReaction = await getReactableReactionByFromDB(
    getReactableReactionByFromDBArgs,
    options,
  );

  return reactableReaction;
}
