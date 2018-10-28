import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, Nullable } from '../types';
import { Workspace } from '../workspaces';
import { reactionsTableName } from './constants';
import { CustomReaction, Reaction } from './types';

export type InsertCustomReactionArgs = InsertReactionArgs;

export async function insertCustomReaction(
  args: InsertCustomReactionArgs,
  options: DBOptions = {},
): Promise<CustomReaction> {
  const customReaction = (await insertReaction(
    args,
    options,
  )) as CustomReaction;

  return customReaction;
}

export type InsertReactionArgs = Pick<Reaction, 'name'> &
  Partial<Pick<Reaction, 'isCustom' | 'imageUrl'>> &
  Readonly<{ workspace: Nullable<Workspace> }>;

/**
 * Inserts a reaction.
 */
export async function insertReaction(
  args: InsertReactionArgs,
  options: DBOptions = {},
): Promise<Reaction> {
  const doInsertReactionArgs = makeInsertReactionArgs(args);

  const reaction = await doInsertReaction(doInsertReactionArgs, options);

  return reaction;
}

function makeInsertReactionArgs(
  args: InsertReactionArgs,
): DoInsertReactionArgs {
  const doInsertReactionArgs: DoInsertReactionArgs = {
    name: args.name,
    isCustom: args.isCustom || false,
    workspaceId: args.workspace ? args.workspace.id : null,
    imageUrl: args.imageUrl || null,
  };

  return doInsertReactionArgs;
}

export type DoInsertReactionArgs = Pick<Reaction, 'name'> &
  Partial<Pick<Reaction, 'isCustom' | 'workspaceId' | 'imageUrl'>>;

export async function doInsertReaction(
  args: DoInsertReactionArgs,
  options: DBOptions = {},
): Promise<Reaction> {
  const query = db
    .insert(args)
    .into(reactionsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [reaction] = await query;

  return reaction;
}
