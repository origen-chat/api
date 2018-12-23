import { addSeconds } from 'date-fns/fp';

import { insertIntoDB } from '../db';
import { DBOptions, NonNegativeInteger } from '../types';
import { Workspace } from '../workspaces';
import { generateRandomCode } from './codes';
import { workspaceInvitationLinksTableName } from './constants';
import { WorkspaceInvitationLink } from './types';

export type CreateWorkspaceInvitationLinkArgs = Pick<
  InsertWorkspaceInvitationLinkIntoDBArgs,
  'workspace' | 'expiresInSeconds'
>;

export async function createWorkspaceInvitationLink(
  args: CreateWorkspaceInvitationLinkArgs,
  options: DBOptions = {},
): Promise<WorkspaceInvitationLink> {
  const code = await generateRandomCode();

  const argsWithCode: InsertWorkspaceInvitationLinkIntoDBArgs = {
    ...args,
    code,
  };

  const workspaceInvitationLink = await insertWorkspaceInvitationLinkIntoDB(
    argsWithCode,
    options,
  );

  return workspaceInvitationLink;
}

type InsertWorkspaceInvitationLinkIntoDBArgs = Readonly<{
  workspace: Workspace;
  expiresInSeconds?: NonNegativeInteger;
}> &
  Pick<DoInsertWorkspaceInvitationLinkIntoDBArgs, 'code'>;

async function insertWorkspaceInvitationLinkIntoDB(
  args: InsertWorkspaceInvitationLinkIntoDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceInvitationLink> {
  const doInsertWorkspaceInvitationLinkIntoDBArgs = makeDoInsertWorkspaceInvitationLinkIntoDBArgs(
    args,
  );

  const workspaceInvitationLink = await doInsertWorkspaceInvitationLinkIntoDB(
    doInsertWorkspaceInvitationLinkIntoDBArgs,
    options,
  );

  return workspaceInvitationLink;
}

function makeDoInsertWorkspaceInvitationLinkIntoDBArgs(
  args: InsertWorkspaceInvitationLinkIntoDBArgs,
): DoInsertWorkspaceInvitationLinkIntoDBArgs {
  let expiresAt;

  if (args.expiresInSeconds) {
    expiresAt = addSeconds(new Date(), args.expiresInSeconds);
  } else {
    expiresAt = null;
  }

  const doInsertWorkspaceInvitationLinkIntoDBArgs: DoInsertWorkspaceInvitationLinkIntoDBArgs = {
    workspaceId: args.workspace.id,
    code: args.code,
    expiresAt,
  };

  return doInsertWorkspaceInvitationLinkIntoDBArgs;
}

type DoInsertWorkspaceInvitationLinkIntoDBArgs = Pick<
  WorkspaceInvitationLink,
  'workspaceId' | 'code' | 'expiresAt'
>;

async function doInsertWorkspaceInvitationLinkIntoDB(
  args: DoInsertWorkspaceInvitationLinkIntoDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceInvitationLink> {
  const workspaceInvitationLink = await insertIntoDB(
    { data: args, tableName: workspaceInvitationLinksTableName },
    options,
  );

  return workspaceInvitationLink;
}
