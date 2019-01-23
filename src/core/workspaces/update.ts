import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';

import { cacheWorkspace } from './cache';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export type UpdateWorkspaceArgs = UpdateWorkspaceInDBArgs;

export async function updateWorkspace(
  workspace: Workspace,
  args: UpdateWorkspaceArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const updatedWorkspace = await updateWorkspaceInDB(workspace, args, options);

  await cacheWorkspace(updatedWorkspace);

  return updatedWorkspace;
}

export type UpdateWorkspaceInDBArgs = Pick<
  DoUpdateWorkspaceInDBArgs,
  'name' | 'displayName' | 'description'
>;

export async function updateWorkspaceInDB(
  workspace: Workspace,
  args: UpdateWorkspaceInDBArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const updatedWorkspace = await doUpdateWorkspaceInDB(
    workspace,
    args,
    options,
  );

  return updatedWorkspace;
}

export type DoUpdateWorkspaceInDBArgs = Partial<
  Pick<Workspace, 'name' | 'displayName' | 'description'>
>;

export async function doUpdateWorkspaceInDB(
  workspace: Workspace,
  args: DoUpdateWorkspaceInDBArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const query = db(workspacesTableName)
    .update(args)
    .where({ id: workspace.id })
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [updatedWorkspace] = await query;

  return updatedWorkspace;
}
