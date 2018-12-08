import { pick } from 'ramda';

import { createInitialDefaultChannel } from '../channels';
import { doInTransaction, insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { addOwnerToWorkspace } from '../workspaceMemberships';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export type CreateWorkspaceArgs = InsertWorkspaceIntoDBArgs;

export async function createWorkspace(
  args: InsertWorkspaceIntoDBArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const createdWorkspace = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    const workspaceOwner = args.owner;

    const workspace = await insertWorkspaceIntoDB(args, optionsWithTransaction);

    await addOwnerToWorkspace(
      workspace,
      workspaceOwner,
      optionsWithTransaction,
    );

    await createInitialDefaultChannel(
      workspace,
      workspaceOwner,
      optionsWithTransaction,
    );

    return workspace;
  }, options);

  return createdWorkspace;
}

export type InsertWorkspaceIntoDBArgs = Pick<
  Workspace,
  'name' | 'displayName'
> &
  Partial<Pick<Workspace, 'description'>> &
  Readonly<{ owner: User }>;

export async function insertWorkspaceIntoDB(
  args: InsertWorkspaceIntoDBArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const doInsertWorkspaceArgs = makeDoInsertWorkspaceIntoDbArgs(args);

  const workspace = await doInsertWorkspaceIntoDB(
    doInsertWorkspaceArgs,
    options,
  );

  return workspace;
}

function makeDoInsertWorkspaceIntoDbArgs(
  args: InsertWorkspaceIntoDBArgs,
): DoInsertWorkspaceIntoDBArgs {
  const doInsertWorkspaceIntoDBArgs: DoInsertWorkspaceIntoDBArgs = pick(
    ['name', 'displayName', 'description'],
    args,
  );

  return doInsertWorkspaceIntoDBArgs;
}

export type DoInsertWorkspaceIntoDBArgs = Pick<
  Workspace,
  'name' | 'displayName'
> &
  Partial<Pick<Workspace, 'description'>>;

export async function doInsertWorkspaceIntoDB(
  args: DoInsertWorkspaceIntoDBArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const workspace = await insertIntoDB(
    { data: args, tableName: workspacesTableName },
    options,
  );

  return workspace;
}
