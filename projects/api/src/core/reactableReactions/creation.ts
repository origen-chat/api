import { isBot } from '../bots';
import { insertIntoDB } from '../db';
import { Reactable } from '../reactables';
import { Reaction } from '../reactions';
import { DBOptions } from '../types';
import { isUser } from '../users';
import { reactableReactionsTableName } from './constants';
import { ReactableReaction, ReactableReactionAuthor } from './types';

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
  author: ReactableReactionAuthor;
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
    userAuthorId: isUser(args.author) ? args.author.id : null,
    botAuthorId: isBot(args.author) ? args.author.id : null,
  };

  return doInsertReactableReactionArgs;
}

export type DoInsertReactableReactionIntoDBArgs = Pick<
  ReactableReaction,
  'reactionId' | 'messageId' | 'userAuthorId' | 'botAuthorId'
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
