import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';

import { reactableReactionsTableName } from './constants';
import { ReactableReaction } from './types';

export async function deleteReactableReaction(
  reactableReaction: ReactableReaction,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  await deleteReactableReactionFromDB(reactableReaction, options);

  return reactableReaction;
}

async function deleteReactableReactionFromDB(
  reactableReaction: ReactableReaction,
  options: DBOptions = {},
): Promise<ReactableReaction> {
  await doDeleteReactableReactionFromDB(reactableReaction, options);

  return reactableReaction;
}

async function doDeleteReactableReactionFromDB(
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
