import db from '../db';
import { DBOptions } from '../types';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export async function deleteWorkspace(
  workspace: Workspace,
  options: DBOptions = {},
): Promise<Workspace> {
  await deleteWorkspaceFromDB(workspace, options);

  return workspace;
}

export async function deleteWorkspaceFromDB(
  workspace: Workspace,
  options: DBOptions = {},
): Promise<Workspace> {
  await doDeleteWorkspaceFromDB(workspace, options);

  return workspace;
}

export async function doDeleteWorkspaceFromDB(
  workspace: Workspace,
  options: DBOptions = {},
): Promise<Workspace> {
  await db
    .delete()
    .from(workspacesTableName)
    .where({ id: workspace.id });

  return workspace;
}
