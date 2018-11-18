import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID, Nullable } from '../types';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export async function getWorkspaceById(
  id: ID,
  options: DBOptions = {},
): Promise<Nullable<Workspace>> {
  const workspace = await getWorkspaceBy({ id }, options);

  return workspace;
}

type GetWorkspaceBy = Pick<Workspace, 'id'> | Pick<Workspace, 'name'>;

async function getWorkspaceBy(
  args: GetWorkspaceBy,
  options: DBOptions = {},
): Promise<Nullable<Workspace>> {
  const query = db
    .select('*')
    .from(workspacesTableName)
    .where(args)
    .first();

  maybeAddTransactionToQuery(query, options);

  const workspace: Nullable<Workspace> = await query;

  return workspace;
}

export async function getWorkspaceByName(
  name: string,
  options: DBOptions = {},
): Promise<Nullable<Workspace>> {
  const workspace = await getWorkspaceBy({ name }, options);

  return workspace;
}

export async function getWorkspacesByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Workspace>> {
  const workspaces = await getWorkspacesBy({ ids }, options);

  return workspaces;
}

export type GetWorkspacesByArgs = Readonly<
  { ids: ReadonlyArray<ID> } | { names: ReadonlyArray<string> }
>;

async function getWorkspacesBy(
  args: GetWorkspacesByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Workspace>> {
  const query = db.select('*').from(workspacesTableName);

  if ((args as any).ids) {
    query.whereIn('id', (args as any).ids);
  } else if ((args as any).names) {
    query.whereIn('name', (args as any).names);
  }

  maybeAddTransactionToQuery(query, options);

  const workspaces: ReadonlyArray<Workspace> = await query;

  return workspaces;
}

export async function getWorkspacesByNames(
  names: ReadonlyArray<string>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Workspace>> {
  const workspaces = await getWorkspacesBy({ names }, options);

  return workspaces;
}
