import { QueryBuilder } from 'knex';

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
import { Workspace } from '../workspaces';
import { channelsTableName } from './constants';
import { Channel, ChannelType } from './types';

export type GetChannelConnectionArgs = Readonly<{
  workspace: Workspace;
  type?: ChannelType;
}> &
  GetChannelConnectionCommonArgs;

type GetChannelConnectionCommonArgs = Readonly<{
  paginationArgs: PaginationArgs;
}>;

export async function getChannelConnection(
  args: GetChannelConnectionArgs,
  options: DBOptions = {},
): Promise<Connection<Channel>> {
  let query: QueryBuilder;
  let makeConnectionFromQueryArgs: MakeConnectionFromQueryArgs<Channel>;

  if (args.workspace) {
    query = db
      .select(`${channelsTableName}.*`)
      .from(channelsTableName)
      .where(`${channelsTableName}.workspaceId`, args.workspace.id);

    if (args.type) {
      query.where(`${channelsTableName}.type`, args.type);
    }

    makeConnectionFromQueryArgs = {
      orderBy: [
        {
          columnName: `${channelsTableName}.id`,
          direction: OrderByDirection.ASC,
        },
      ],
      paginationArgs: args.paginationArgs,
    };
  } else {
    query = db.select(`${channelsTableName}.*`).from(channelsTableName);

    makeConnectionFromQueryArgs = {
      orderBy: [
        {
          columnName: `${channelsTableName}.id`,
          direction: OrderByDirection.ASC,
        },
      ],
      paginationArgs: args.paginationArgs,
    };
  }

  const connection = await makeConnectionFromQuery<Channel>(
    query,
    makeConnectionFromQueryArgs,
    options,
  );

  return connection;
}
