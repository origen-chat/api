import db, { maybeAddTransactionToQuery } from '../db';
import { isMessage } from '../messages';
import { reactableReactionsTableName } from '../reactableReactions';
import { Reactable } from '../reactables';
import { DBOptions, NonNegativeInteger } from '../types';
import { reactionsTableName } from './constants';
import { Reaction } from './types';

export type ReactionWithCount = Reaction &
  Readonly<{ count: NonNegativeInteger }>;

export type GetReactionsArgs = Readonly<{ reactable: Reactable }>;

export async function getReactions(
  args: GetReactionsArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<ReactionWithCount>> {
  const countQuery = `
    COUNT(${reactableReactionsTableName}."reactionId") FILTER (
      WHERE
        ${reactableReactionsTableName}."reactionId" = ${reactionsTableName}.id
    )
  `;

  const query = db
    .select(`${reactionsTableName}.*`, db.raw(countQuery))
    .from(reactionsTableName)
    .innerJoin(
      reactableReactionsTableName,
      `${reactableReactionsTableName}.reactionId`,
      `${reactionsTableName}.id`,
    );

  if (isMessage(args.reactable)) {
    query.where(`${reactableReactionsTableName}.messageId`, args.reactable.id);
  }

  query.groupBy(`${reactionsTableName}.id`);

  maybeAddTransactionToQuery(query, options);

  const reactionsWithCount = await query;

  return reactionsWithCount;
}
