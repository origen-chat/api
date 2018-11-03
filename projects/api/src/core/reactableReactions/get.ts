import db, { maybeAddTransactionToQuery } from '../db';
import { isMessage } from '../messages';
import { Reactable } from '../reactables';
import { Reaction } from '../reactions';
import { DBOptions, ID, Nullable } from '../types';
import { User } from '../users';
import { reactableReactionsTableName } from './constants';
import { ReactableReaction } from './types';

export async function getReactableReactionById(
  id: ID,
  options: DBOptions = {},
): Promise<Nullable<ReactableReaction>> {
  const reactableReaction = await getReactableReactionBy({ id }, options);

  return reactableReaction;
}

export type GetReactableReactionByArgs =
  | Readonly<{
      id: ID;
    }>
  | GetReactableReactionByAuthorReactableAndReactionArgs;

export async function getReactableReactionBy(
  args: GetReactableReactionByArgs,
  options: DBOptions = {},
): Promise<Nullable<ReactableReaction>> {
  const query = db
    .select('*')
    .from(reactableReactionsTableName)
    .first();

  if ((args as any).id) {
    query.where({ id: (args as any).id });
  } else if ((args as any).author) {
    query.where({
      authorId: (args as any).author.id,
      messageId: isMessage((args as any).message)
        ? (args as any).message.id
        : null,
      reactionId: (args as any).reaction.id,
    });
  }

  maybeAddTransactionToQuery(query, options);

  const reactableReaction: Nullable<ReactableReaction> = await query;

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
): Promise<Nullable<ReactableReaction>> {
  const reactableReaction = await getReactableReactionBy(args, options);

  return reactableReaction;
}
