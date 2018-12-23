import db, { maybeAddTransactionToQuery } from '../db';
import { ComparisonOperator, DBOptions } from '../types';
import { Workspace } from '../workspaces';
import { workspaceInvitationLinksTableName } from './constants';
import { WorkspaceInvitationLink } from './types';

export async function getWorkspaceInvitationLinkById(
  id: WorkspaceInvitationLink['id'],
  options: DBOptions = {},
): Promise<WorkspaceInvitationLink | null> {
  const workspaceInvitationLink = await getWorkspaceInvitationLinkByFromDB(
    { id },
    options,
  );

  return workspaceInvitationLink;
}

export type GetWorkspaceInvitationLinkByFromDBArgs =
  | Readonly<{ workspace: Workspace; id?: null; code?: null }>
  | Pick<WorkspaceInvitationLink, 'id'> &
      Readonly<{ workspace?: null; code?: null }>
  | Pick<WorkspaceInvitationLink, 'code'> &
      Readonly<{ id?: null; workspace?: null }>;

async function getWorkspaceInvitationLinkByFromDB(
  args: GetWorkspaceInvitationLinkByFromDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceInvitationLink | null> {
  const query = db
    .select(`${workspaceInvitationLinksTableName}.*`)
    .from(workspaceInvitationLinksTableName)
    .first();

  if (args.id) {
    query.where({ id: args.id });
  } else if (args.code) {
    query.where({ code: args.code });
  } else if (args.workspace) {
    query
      .where({ workspaceId: args.workspace.id, deactivatedAt: null })
      .where(
        `${workspaceInvitationLinksTableName}.expiresAt`,
        ComparisonOperator.GreatherThanOrEqual,
        db.raw('now()'),
      );
  }

  maybeAddTransactionToQuery(query, options);

  const workspaceInvitationLink: WorkspaceInvitationLink | null = await query;

  return workspaceInvitationLink;
}

export async function getWorkspaceInvitationLinkByWorkspace(
  workspace: Workspace,
  options: DBOptions = {},
): Promise<WorkspaceInvitationLink | null> {
  const workspaceInvitationLink = await getWorkspaceInvitationLinkByFromDB(
    { workspace },
    options,
  );

  return workspaceInvitationLink;
}

export async function getWorkspaceInvitationLinkByCode(
  code: WorkspaceInvitationLink['code'],
  options: DBOptions = {},
): Promise<WorkspaceInvitationLink | null> {
  const workspaceInvitationLink = await getWorkspaceInvitationLinkByFromDB(
    { code },
    options,
  );

  return workspaceInvitationLink;
}
