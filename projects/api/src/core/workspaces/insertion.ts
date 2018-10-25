import db from '../db';

import { DBOptions } from '../types';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export type InsertWorkspaceArgs = Pick<Workspace, 'name' | 'displayName'> &
  Partial<Pick<Workspace, 'description'>>;

/**
 * Inserts a workspace.
 */
export async function insertWorkspace(
  args: InsertWorkspaceArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const workspace = await doInsertWorkspace(args, options);

  return workspace;
}

export type DoInsertWorkspaceArgs = Pick<Workspace, 'name' | 'displayName'> &
  Partial<Pick<Workspace, 'description'>>;

export async function doInsertWorkspace(
  args: DoInsertWorkspaceArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const query = db
    .insert(args)
    .into(workspacesTableName)
    .returning('*');

  if (options.transaction) {
    query.transacting(options.transaction);
  }

  const [workspace] = await query;

  return workspace;
}
