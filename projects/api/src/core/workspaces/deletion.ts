import db from '../db';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

/**
 * Deletes a workspace.
 */
export async function deleteWorkspace(
  workspace: Workspace,
): Promise<Workspace> {
  await db
    .delete()
    .from(workspacesTableName)
    .where({ id: workspace.id });

  return workspace;
}
