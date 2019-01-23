import { DBOptions, NonNegativeInteger } from '../types';
import { User, usersTableName } from '../users';
import { Workspace } from '../workspaces';
import db, { maybeAddTransactionToQuery } from '../db';

import { createWorkspaceOwnerMembership } from './creation';
import { WorkspaceMembership } from './types';
import { workspaceMembershipsTableName } from './constants';

export async function addOwnerToWorkspace(
  workspace: Workspace,
  owner: User,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  const workspaceOwnerMembership = await createWorkspaceOwnerMembership(
    workspace,
    owner,
    options,
  );

  return workspaceOwnerMembership;
}

export async function getWorkspaceBillableMemberCount(
  workspace: Workspace,
  options: DBOptions = {},
): Promise<NonNegativeInteger> {
  const query = db
    .count(`${usersTableName}.id`)
    .innerJoin(
      workspaceMembershipsTableName,
      `${workspaceMembershipsTableName}.userMemberId`,
      `${usersTableName}.id`,
    )
    .where(`${workspaceMembershipsTableName}.workspaceId`, workspace.id);

  maybeAddTransactionToQuery(query, options);

  const billableMemberCount = await query;

  return billableMemberCount;
}
