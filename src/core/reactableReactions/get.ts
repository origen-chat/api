import { isBot } from '../bots';
import db, { maybeAddTransactionToQuery } from '../db';
import { Reactable } from '../reactables';
import { Reaction } from '../reactions';
import { DBOptions, ID } from '../types';
import { isUser } from '../users';

import { reactableReactionsTableName } from './constants';
import { ReactableReaction, ReactableReactionAuthor } from './types';

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
      userAuthorId?: undefined;
      botAuthorId?: undefined;
      messageId?: undefined;
      reactionId?: undefined;
    }
  | {
      userAuthorId?: ID | null;
      botAuthorId?: ID | null;
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
  } else if (args.reactionId) {
    query.where({
      userAuthorId: args.userAuthorId ? args.userAuthorId : null,
      botAuthorId: args.botAuthorId ? args.botAuthorId : null,
      messageId: args.messageId ? args.messageId : null,
      reactionId: args.reactionId,
    });
  }

  maybeAddTransactionToQuery(query, options);

  const reactableReaction: ReactableReaction | null = await query;

  return reactableReaction;
}

export type GetReactableReactionByAuthorReactableAndReactionArgs = Readonly<{
  author: ReactableReactionAuthor;
  reactable: Reactable;
  reaction: Reaction;
}>;

export async function getReactableReactionByAuthorReactableAndReaction(
  args: GetReactableReactionByAuthorReactableAndReactionArgs,
  options: DBOptions = {},
): Promise<ReactableReaction | null> {
  const getReactableReactionByFromDBArgs: GetReactableReactionByFromDBArgs = {
    userAuthorId: isUser(args.author) ? args.author.id : null,
    botAuthorId: isBot(args.author) ? args.author.id : null,
    messageId: args.reactable.id,
    reactionId: args.reaction.id,
  };

  const reactableReaction = await getReactableReactionByFromDB(
    getReactableReactionByFromDBArgs,
    options,
  );

  return reactableReaction;
}
