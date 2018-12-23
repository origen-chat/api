import db, { maybeAddTransactionToQuery } from '../db';
import { LoadingMessage } from '../loadingMessages/types';
import { DBOptions, ID } from '../types';
import { Workspace } from '../workspaces';
import { workspaceLoadingMessagesTableName } from './constants';
import { WorkspaceLoadingMessage } from './types';

export type GetWorkspaceLoadingMessageByWorkspaceAndLoadingMessageArgs = Readonly<{
  workspace: Workspace;
  loadingMessage: LoadingMessage;
}>;

export async function getWorkspaceLoadingMessageByWorkspaceAndLoadingMessage(
  args: GetWorkspaceLoadingMessageByWorkspaceAndLoadingMessageArgs,
  options: DBOptions = {},
): Promise<WorkspaceLoadingMessage | null> {
  const workspaceLoadingMessage = await getWorkspaceLoadingMessageByFromDB(
    args,
    options,
  );

  return workspaceLoadingMessage;
}

type GetWorkspaceLoadingMessageByFromDBArgs = GetWorkspaceLoadingMessageByWorkspaceAndLoadingMessageArgs;

async function getWorkspaceLoadingMessageByFromDB(
  args: GetWorkspaceLoadingMessageByFromDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceLoadingMessage | null> {
  const query = db
    .select(`${workspaceLoadingMessagesTableName}.*`)
    .from(workspaceLoadingMessagesTableName)
    .first();

  if (args.loadingMessage && args.workspace) {
    query.where({
      loadingMessageId: args.loadingMessage.id,
      workspaceId: args.workspace.id,
    });
  }

  maybeAddTransactionToQuery(query, options);

  const workspaceLoadingMessage: WorkspaceLoadingMessage | null = await query;

  return workspaceLoadingMessage;
}

export async function getWorkspaceLoadingMessageById(
  id: ID,
  options: DBOptions = {},
): Promise<WorkspaceLoadingMessage | null> {
  const [loadingMessageWorkspace] = await getWorkspaceLoadingMessagesByIds(
    [id],
    options,
  );

  if (!loadingMessageWorkspace) {
    return null;
  }

  return loadingMessageWorkspace;
}

export async function getWorkspaceLoadingMessagesByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<WorkspaceLoadingMessage>> {
  const workspaceLoadingMessages = await getWorkspaceLoadingMessagesByFromDB(
    { ids },
    options,
  );

  return workspaceLoadingMessages;
}

export type GetWorkspaceLoadingMessagesByFromDBArgs = Readonly<{
  ids: ReadonlyArray<ID>;
}>;

async function getWorkspaceLoadingMessagesByFromDB(
  args: GetWorkspaceLoadingMessagesByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<WorkspaceLoadingMessage>> {
  const query = db
    .select(`${workspaceLoadingMessagesTableName}.*`)
    .from(workspaceLoadingMessagesTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const workspaceLoadingMessages: ReadonlyArray<
    WorkspaceLoadingMessage
  > = await query;

  return workspaceLoadingMessages;
}
