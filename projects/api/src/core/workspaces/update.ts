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
  opts: DBOptions = {},
): Promise<Workspace> {
  const updatedWorkspace = await doUpdateWorkspace(workspace, args, opts);

  return updatedWorkspace;
}

export type DoUpdateWorkspaceArgs = Partial<
  Pick<Workspace, 'name' | 'displayName' | 'description'>
>;

export async function doUpdateWorkspace(
  workspace: Workspace,
  args: DoUpdateWorkspaceArgs,
  opts: DBOptions = {},
): Promise<Workspace> {
  const query = db(workspacesTableName)
    .update(args)
    .where({ id: workspace.id })
    .returning('*');

  if (opts.transaction) {
    query.transacting(opts.transaction);
  }

  const [updatedWorkspace] = await query;

  return updatedWorkspace;
}
