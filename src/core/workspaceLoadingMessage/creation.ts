import { insertIntoDB } from '../db';
import { LoadingMessage } from '../loadingMessages';
import { DBOptions } from '../types';
import { Workspace } from '../workspaces';
import { workspaceLoadingMessagesTableName } from './constants';
import { WorkspaceLoadingMessage } from './types';

export type CreateWorkspaceLoadingMessageArgs = InsertWorkspaceLoadingMessageIntoDBArgs;

export async function createWorkspaceLoadingMessage(
  args: CreateWorkspaceLoadingMessageArgs,
  options: DBOptions = {},
): Promise<WorkspaceLoadingMessage> {
  const workspaceLoadingMessage = await insertWorkspaceLoadingMessageIntoDB(
    args,
    options,
  );

  return workspaceLoadingMessage;
}

type InsertWorkspaceLoadingMessageIntoDBArgs = Readonly<{
  workspace: Workspace;
  loadingMessage: LoadingMessage;
  enabled?: boolean;
}>;

async function insertWorkspaceLoadingMessageIntoDB(
  args: InsertWorkspaceLoadingMessageIntoDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceLoadingMessage> {
  const doInsertWorkspaceLoadingMessageIntoDBArgs = makeDoInsertWorkspaceLoadingMessageIntoDBArgs(
    args,
  );

  const workspaceLoadingMessage = await doInsertWorkspaceLoadingMessageIntoDB(
    doInsertWorkspaceLoadingMessageIntoDBArgs,
    options,
  );

  return workspaceLoadingMessage;
}

function makeDoInsertWorkspaceLoadingMessageIntoDBArgs(
  args: InsertWorkspaceLoadingMessageIntoDBArgs,
): DoInsertWorkspaceLoadingMessageIntoDBArgs {
  const doInsertWorkspaceLoadingMessageIntoDBArgs: DoInsertWorkspaceLoadingMessageIntoDBArgs = {
    workspaceId: args.workspace.id,
    loadingMessageId: args.loadingMessage.id,
    enabled: args.enabled || true,
  };

  return doInsertWorkspaceLoadingMessageIntoDBArgs;
}

type DoInsertWorkspaceLoadingMessageIntoDBArgs = Pick<
  WorkspaceLoadingMessage,
  'workspaceId' | 'loadingMessageId' | 'enabled'
>;

async function doInsertWorkspaceLoadingMessageIntoDB(
  args: DoInsertWorkspaceLoadingMessageIntoDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceLoadingMessage> {
  const workspaceLoadingMessage = await insertIntoDB(
    { data: args, tableName: workspaceLoadingMessagesTableName },
    options,
  );

  return workspaceLoadingMessage;
}
