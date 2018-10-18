import db from '../db';
import { ID, Nullable } from '../types';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export async function getWorkspaceById(id: ID): Promise<Nullable<Workspace>> {
  const workspace = await getWorkspaceBy({ id });

  return workspace;
}

type GetWorkspaceBy = Pick<Workspace, 'id'> | Pick<Workspace, 'name'>;

async function getWorkspaceBy(
  args: GetWorkspaceBy,
): Promise<Nullable<Workspace>> {
  const workspace: Nullable<Workspace> = await db
    .select('*')
    .from(workspacesTableName)
    .where(args)
    .first();

  return workspace;
}

export async function getWorkspaceByName(
  name: string,
): Promise<Nullable<Workspace>> {
  const workspace = await getWorkspaceBy({ name });

  return workspace;
}

export type UpdateWorkspaceArgs = Partial<
  Pick<Workspace, 'name' | 'displayName' | 'description'>
>;

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
