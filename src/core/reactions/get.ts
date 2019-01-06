import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
import { reactionsTableName } from './constants';
import { Reaction } from './types';

export async function getReactionById(
  id: ID,
  options: DBOptions = {},
): Promise<Reaction | null> {
  const [reaction] = await getReactionsByIds([id], options);

  return reaction;
}

export async function getReactionsByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Reaction>> {
  const reactions = await getReactionsByFromDB({ ids }, options);

  return reactions;
}

export type GetReactionsByFromDBArgs = Readonly<{ ids: ReadonlyArray<ID> }>;

async function getReactionsByFromDB(
  args: GetReactionsByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Reaction>> {
  const query = db.select(`${reactionsTableName}.*`).from(reactionsTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const reactions: ReadonlyArray<Reaction> = await query;

  return reactions;
}
