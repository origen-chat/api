import { insertIntoDB } from '../db';
import { Reactable } from '../reactables';
import { Reaction } from '../reactions';
import { DBOptions } from '../types';
import { User } from '../users';
import { reactableReactionsTableName } from './constants';
import { ReactableReaction } from './types';

export type CreateReactableReactionArgs = InsertReactableReactionIntoDBArgs;

export async function createReactableReaction(
  args: InsertReactableReactionIntoDBArgs,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  const reactableReaction = await insertReactableReactionIntoDB(args, options);

  return reactableReaction;
}

type InsertReactableReactionIntoDBArgs = Readonly<{
  reactable: Reactable;
  author: User;
  reaction: Reaction;
}>;

async function insertReactableReactionIntoDB(
  args: InsertReactableReactionIntoDBArgs,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  const doInsertReactableReactionIntoDBArgs = makeDoInsertReactableReactionIntoDBArgs(
    args,
  );

  const reactableReaction = await doInsertReactableReactionIntoDB(
    doInsertReactableReactionIntoDBArgs,
    options,
  );

  return reactableReaction;
}

function makeDoInsertReactableReactionIntoDBArgs(
  args: InsertReactableReactionIntoDBArgs,
): DoInsertReactableReactionIntoDBArgs {
  const doInsertReactableReactionArgs: DoInsertReactableReactionIntoDBArgs = {
    reactionId: args.reaction.id,
    messageId: args.reactable.id,
    authorId: args.author.id,
  };

  return doInsertReactableReactionArgs;
}

export type DoInsertReactableReactionIntoDBArgs = Pick<
  ReactableReaction,
  'reactionId' | 'messageId' | 'authorId'
>;

export async function doInsertReactableReactionIntoDB(
  args: DoInsertReactableReactionIntoDBArgs,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  const reactableReaction = await insertIntoDB(
    { data: args, tableName: reactableReactionsTableName },
    options,
  );

  return reactableReaction;
}
