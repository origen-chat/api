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

export type InsertWorkspaceArgs = Pick<Workspace, 'name'> &
  Partial<Pick<Workspace, 'description'>>;

/**
 * Inserts a new workspace.
 */
export async function insertWorkspace(
  args: InsertWorkspaceArgs,
): Promise<Workspace> {
  const workspace: Workspace = await db
    .insert(args)
    .into(workspacesTableName)
    .returning('*');

  return workspace;
}

export type UpdateWorkspaceArgs = Partial<
  Pick<Workspace, 'name' | 'description'>
>;

/**
 * Updates a workspace.
 */
export async function updateWorkspace(
  workspace: Workspace,
  args: UpdateWorkspaceArgs,
): Promise<Workspace> {
  const updatedWorkspace: Workspace = await db(workspacesTableName)
    .update(args)
    .where({ id: workspace.id })
    .returning('*');

  return updatedWorkspace;
}

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
