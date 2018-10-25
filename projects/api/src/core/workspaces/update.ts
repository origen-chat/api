import db from '../db';
import { DBOptions } from '../types';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export type UpdateWorkspaceArgs = Partial<
  Pick<Workspace, 'name' | 'displayName' | 'description'>
>;

/**
 * Updates a workspace.
 */
export async function updateWorkspace(
  workspace: Workspace,
  args: UpdateWorkspaceArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const updatedWorkspace = await doUpdateWorkspace(workspace, args, options);

  return updatedWorkspace;
}

export type DoUpdateWorkspaceArgs = Partial<
  Pick<Workspace, 'name' | 'displayName' | 'description'>
>;

export async function doUpdateWorkspace(
  workspace: Workspace,
  args: DoUpdateWorkspaceArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const query = db(workspacesTableName)
    .update(args)
    .where({ id: workspace.id })
    .returning('*');

  if (options.transaction) {
    query.transacting(options.transaction);
  }

  const [updatedWorkspace] = await query;

  return updatedWorkspace;
}
