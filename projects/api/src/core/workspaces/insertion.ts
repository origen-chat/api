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
  opts: DBOptions = {},
): Promise<Workspace> {
  const workspace = await doInsertWorkspace(args, opts);

  return workspace;
}

export type DoInsertWorkspaceArgs = Pick<Workspace, 'name' | 'displayName'> &
  Partial<Pick<Workspace, 'description'>>;

export async function doInsertWorkspace(
  args: DoInsertWorkspaceArgs,
  opts: DBOptions = {},
): Promise<Workspace> {
  const query = db
    .insert(args)
    .into(workspacesTableName)
    .returning('*');

  if (opts.transaction) {
    query.transacting(opts.transaction);
  }

  const [workspace] = await query;

  return workspace;
}
