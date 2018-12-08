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
import { isUser } from '../users';
import {
  WorkspaceMember,
  WorkspaceMembershipRole,
  workspaceMembershipsTableName,
} from '../workspaceMemberships';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export type GetWorkspaceConnectionArgs = Readonly<{
  member: WorkspaceMember;
  role?: WorkspaceMembershipRole;
}> &
  GetWorkspaceConnectionCommonArgs;

type GetWorkspaceConnectionCommonArgs = Readonly<{
  paginationArgs: PaginationArgs;
}>;

export async function getWorkspaceConnection(
  args: GetWorkspaceConnectionArgs,
  options: DBOptions = {},
): Promise<Connection<Workspace>> {
  let query: QueryBuilder;
  let makeConnectionFromQueryArgs: MakeConnectionFromQueryArgs;

  if (args.member) {
    query = db
      .select(
        `${workspacesTableName}.*`,
        `${workspaceMembershipsTableName}.role`,
      )
      .from(workspacesTableName)
      .innerJoin(
        workspaceMembershipsTableName,
        `${workspaceMembershipsTableName}.workspaceId`,
        `${workspacesTableName}.id`,
      );

    if (isUser(args.member)) {
      query.where(
        `${workspaceMembershipsTableName}.userMemberId`,
        args.member.id,
      );
    } else {
      query.where(
        `${workspaceMembershipsTableName}.botMemberId`,
        args.member.id,
      );
    }

    if (args.role) {
      query.where(`${workspaceMembershipsTableName}.role`, args.role);
    }

    makeConnectionFromQueryArgs = {
      orderBy: [
        {
          columnName: `${workspacesTableName}.id`,
          direction: OrderByDirection.ASC,
        },
      ],
      paginationArgs: args.paginationArgs,
      edgeFields: ['role'],
    };
  } else {
    query = db.select(`${workspacesTableName}.*`).from(workspacesTableName);

    makeConnectionFromQueryArgs = {
      orderBy: [
        {
          columnName: `${workspacesTableName}.id`,
          direction: OrderByDirection.ASC,
        },
      ],
      paginationArgs: args.paginationArgs,
    };
  }

  const connection = await makeConnectionFromQuery<Workspace>(
    query,
    makeConnectionFromQueryArgs,
    options,
  );

  return connection;
}
