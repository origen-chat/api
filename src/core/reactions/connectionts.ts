import { botsTableName } from '../bots/constants';
import db from '../db';
import {
  makeConnectionFromQuery,
  MakeConnectionFromQueryArgs,
} from '../helpers';
import { isMessage } from '../messages';
import { reactableReactionsTableName } from '../reactableReactions';
import {
  ReactableReaction,
  ReactableReactionAuthor,
} from '../reactableReactions/types';
import { Reactable } from '../reactables';
import {
  Connection,
  DBOptions,
  Edge,
  OrderByDirection,
  PaginationArgs,
} from '../types';
import { usersTableName } from '../users';
import { Reaction } from './types';

export type GetReactableReactionAuthorConnectionArgs = Readonly<{
  reactable: Reactable;
  reaction: Reaction;
}> &
  GetReactableReactionAuthorConnectionCommonArgs;

type GetReactableReactionAuthorConnectionCommonArgs = Readonly<{
  paginationArgs: PaginationArgs;
}>;

const userAuthorDataField = 'user';
const botAuthorDataField = 'bot';

export async function getReactableReactionAuthorConnection(
  args: GetReactableReactionAuthorConnectionArgs,
  options: DBOptions = {},
): Promise<Connection<ReactableReactionAuthor>> {
  const query = db
    .select(
      `${reactableReactionsTableName}.*`,
      db.raw(`to_json(${usersTableName}.*) as ${userAuthorDataField}`),
      db.raw(`to_json(${botsTableName}.*) as ${botAuthorDataField}`),
    )
    .from(reactableReactionsTableName)
    .leftJoin(
      usersTableName,
      `${usersTableName}.id`,
      `${reactableReactionsTableName}.userAuthorId`,
    )
    .leftJoin(
      botsTableName,
      `${botsTableName}.id`,
      `${reactableReactionsTableName}.botAuthorId`,
    )
    .where(`${reactableReactionsTableName}.reactionId`, args.reaction.id);

  if (isMessage(args.reactable)) {
    query.where(`${reactableReactionsTableName}.messageId`, args.reactable.id);
  }

  const makeConnectionFromQueryArgs: MakeConnectionFromQueryArgs<any> = {
    orderBy: [
      {
        columnName: `${reactableReactionsTableName}.insertedAt`,
        direction: OrderByDirection.ASC,
      },
      {
        columnName: `${reactableReactionsTableName}.id`,
        direction: OrderByDirection.ASC,
      },
    ],
    paginationArgs: args.paginationArgs,
    transformEdge,
  };

  const connection = await makeConnectionFromQuery<ReactableReactionAuthor>(
    query,
    makeConnectionFromQueryArgs,
    options,
  );

  return connection;
}

function transformEdge(
  edge: Edge<ReactableReaction, any>,
): Edge<ReactableReactionAuthor> {
  const transformedEdge = { ...edge };

  if (edge.node[userAuthorDataField]) {
    const userAuthor = edge.node[userAuthorDataField];

    transformedEdge.node = userAuthor;
  } else {
    const botAuthor = edge.node[botAuthorDataField];

    transformedEdge.node = botAuthor;
  }

  return transformedEdge;
}
