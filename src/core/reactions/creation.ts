import { insertIntoDB } from '../db';
import { DBOptions, Nullable } from '../types';
import { Workspace } from '../workspaces';

import { reactionsTableName } from './constants';
import { Reaction } from './types';

export type CreateReactionArgs = InsertReactionIntoDBArgs;

export async function createReaction(
  args: CreateReactionArgs,
  options: DBOptions = {},
): Promise<Reaction> {
  const reaction = await insertReactionIntoDB(args, options);

  return reaction;
}

export type InsertReactionIntoDBArgs = Pick<Reaction, 'name'> &
  Partial<Pick<Reaction, 'isCustom' | 'imageUrl'>> &
  Readonly<{ workspace: Nullable<Workspace> }>;

export async function insertReactionIntoDB(
  args: InsertReactionIntoDBArgs,
  options: DBOptions = {},
): Promise<Reaction> {
  const doInsertReactionIntoDBArgs = makeInsertReactionIntoDBArgs(args);

  const reaction = await doInsertReactionIntoDB(
    doInsertReactionIntoDBArgs,
    options,
  );

  return reaction;
}

function makeInsertReactionIntoDBArgs(
  args: InsertReactionIntoDBArgs,
): DoInsertReactionIntoDBArgs {
  const doInsertReactionIntoDBArgs: DoInsertReactionIntoDBArgs = {
    name: args.name,
    isCustom: args.isCustom || false,
    workspaceId: args.workspace ? args.workspace.id : null,
    imageUrl: args.imageUrl || null,
  };

  return doInsertReactionIntoDBArgs;
}

export type DoInsertReactionIntoDBArgs = Pick<Reaction, 'name'> &
  Partial<Pick<Reaction, 'isCustom' | 'workspaceId' | 'imageUrl'>>;

export async function doInsertReactionIntoDB(
  args: DoInsertReactionIntoDBArgs,
  options: DBOptions = {},
): Promise<Reaction> {
  const reaction = await insertIntoDB(
    { data: args, tableName: reactionsTableName },
    options,
  );

  return reaction;
}
