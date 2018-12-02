import { QueryBuilder } from 'knex';

import { Channel } from '../channels';
import db from '../db';
import {
  makeConnectionFromQuery,
  MakeConnectionFromQueryArgs,
} from '../helpers';
import {
  Connection,
  DBOptions,
  OrderByDirection,
  PaginationArgs,
} from '../types';
import { messagesTableName } from './constants';
import { Message } from './types';

export type GetMessageConnectionArgs = Readonly<{
  channel: Channel;
}> &
  GetMessageConnectionCommonArgs;

type GetMessageConnectionCommonArgs = Readonly<{
  paginationArgs: PaginationArgs;
}>;

export async function getMessageConnection(
  args: GetMessageConnectionArgs,
  options: DBOptions = {},
): Promise<Connection<Message>> {
  let query: QueryBuilder;
  let makeConnectionFromQueryArgs: MakeConnectionFromQueryArgs;

  if (args.channel) {
    query = db
      .select(`${messagesTableName}.*`)
      .from(messagesTableName)
      .where(`${messagesTableName}.channelId`, args.channel.id);

    makeConnectionFromQueryArgs = {
      orderBy: [
        {
          columnName: `${messagesTableName}.insertedAt`,
          direction: OrderByDirection.ASC,
        },
        {
          columnName: `${messagesTableName}.id`,
          direction: OrderByDirection.ASC,
        },
      ],
      paginationArgs: args.paginationArgs,
    };
  } else {
    query = db.select(`${messagesTableName}.*`).from(messagesTableName);

    makeConnectionFromQueryArgs = {
      orderBy: [
        {
          columnName: `${messagesTableName}.id`,
          direction: OrderByDirection.ASC,
        },
      ],
      paginationArgs: args.paginationArgs,
    };
  }

  const connection = await makeConnectionFromQuery<Message>(
    query,
    makeConnectionFromQueryArgs,
    options,
  );

  return connection;
}
