import { insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';

import { loadingMessagesTableName } from './constants';
import { LoadingMessage } from './types';

export type CreateLoadingMessageArgs = InsertLoadingMessageIntoDBArgs;

export async function createLoadingMessage(
  args: CreateLoadingMessageArgs,
  options: DBOptions = {},
): Promise<LoadingMessage> {
  const loadingMessage = await insertLoadingMessageIntoDB(args, options);

  return loadingMessage;
}

type InsertLoadingMessageIntoDBArgs = Readonly<
  { author: User; workspace: Workspace } | { author?: null; workspace?: null }
> &
  Pick<DoInsertLoadingMessageIntoDBArgs, 'message' | 'category'>;

async function insertLoadingMessageIntoDB(
  args: InsertLoadingMessageIntoDBArgs,
  options: DBOptions = {},
): Promise<LoadingMessage> {
  const doInsertLoadingMessageIntoDBArgs = makeDoInsertLoadingMessageIntoDBArgs(
    args,
  );

  const loadingMessage = await doInsertLoadingMessageIntoDB(
    doInsertLoadingMessageIntoDBArgs,
    options,
  );

  return loadingMessage;
}

function makeDoInsertLoadingMessageIntoDBArgs(
  args: InsertLoadingMessageIntoDBArgs,
): DoInsertLoadingMessageIntoDBArgs {
  const doInsertLoadingMessageIntoDBArgs: DoInsertLoadingMessageIntoDBArgs = {
    message: args.message,
    workspaceId: args.workspace ? args.workspace.id : null,
    authorId: args.author ? args.author.id : null,
    category: args.category,
  };

  return doInsertLoadingMessageIntoDBArgs;
}

type DoInsertLoadingMessageIntoDBArgs = Pick<LoadingMessage, 'message'> &
  Partial<Pick<LoadingMessage, 'category' | 'authorId' | 'workspaceId'>>;

async function doInsertLoadingMessageIntoDB(
  args: DoInsertLoadingMessageIntoDBArgs,
  options: DBOptions = {},
): Promise<LoadingMessage> {
  const loadingMessage = await insertIntoDB(
    { data: args, tableName: loadingMessagesTableName },
    options,
  );

  return loadingMessage;
}
