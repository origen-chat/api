import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID, Nullable } from '../types';

import { getCachedWorkspace, maybeCacheWorkspace } from './cache';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export async function getWorkspaceById(
  id: ID,
  options: DBOptions = {},
): Promise<Workspace | null> {
  const cachedWorkspace = await getCachedWorkspace(id);

  if (cachedWorkspace) {
    return cachedWorkspace;
  }

  const workspace = await getWorkspaceByFromDB({ id }, options);

  await maybeCacheWorkspace(workspace);

  return workspace;
}

type GetWorkspaceByFromDBArgs =
  | Pick<Workspace, 'id'> &
      Readonly<{
        name?: undefined;
      }>
  | Pick<Workspace, 'name'> & Readonly<{ id?: undefined }>;

async function getWorkspaceByFromDB(
  args: GetWorkspaceByFromDBArgs,
  options: DBOptions = {},
): Promise<Workspace | null> {
  const query = db
    .select('*')
    .from(workspacesTableName)
    .first();

  if (args.id) {
    query.where({ id: args.id });
  } else if (args.name) {
    query.where({ name: args.name });
  }

  maybeAddTransactionToQuery(query, options);

  const workspace: Workspace | null = await query;

  return workspace;
}

export async function getWorkspaceByName(
  name: string,
  options: DBOptions = {},
): Promise<Nullable<Workspace>> {
  const workspace = await getWorkspaceByFromDB({ name }, options);

  await maybeCacheWorkspace(workspace);

  return workspace;
}

export async function getWorkspacesByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Workspace>> {
  const workspaces = await getWorkspacesByFromDB({ ids }, options);

  return workspaces;
}

export type GetWorkspacesByFromDBArgs = Readonly<
  | { ids: ReadonlyArray<ID>; names?: undefined }
  | { names: ReadonlyArray<string>; ids?: undefined }
>;

async function getWorkspacesByFromDB(
  args: GetWorkspacesByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Workspace>> {
  const query = db.select('*').from(workspacesTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  } else if (args.names) {
    query.whereIn('name', args.names as any);
  }

  maybeAddTransactionToQuery(query, options);

  const workspaces: ReadonlyArray<Workspace> = await query;

  return workspaces;
}

export async function getWorkspacesByNames(
  names: ReadonlyArray<string>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Workspace>> {
  const workspaces = await getWorkspacesByFromDB({ names }, options);

  return workspaces;
}
