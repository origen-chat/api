import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
import { workspaceLoadingMessagesTableName } from '../workspaceLoadingMessage';
import { Workspace } from '../workspaces';
import { loadingMessagesTableName } from './constants';
import { LoadingMessage } from './types';

export async function getRandomLoadingMessage(
  workspace: Workspace,
  options: DBOptions = {},
): Promise<LoadingMessage | null> {
  const query = db
    .select(`${loadingMessagesTableName}.*`)
    .from(loadingMessagesTableName)
    .innerJoin(
      workspaceLoadingMessagesTableName,
      `${workspaceLoadingMessagesTableName}.loadingMessageId`,
      `${loadingMessagesTableName}.id`,
    )
    .where(`${workspaceLoadingMessagesTableName}.enabled`, true)
    .where(`${workspaceLoadingMessagesTableName}.workspaceId`, workspace.id)
    .orderByRaw('random()')
    .first();

  maybeAddTransactionToQuery(query, options);

  const loadingMessage = await query;

  return loadingMessage;
}

export async function getLoadingMessageById(
  id: ID,
  options: DBOptions = {},
): Promise<LoadingMessage | null> {
  const loadingMessage = await getLoadingMessageByFromDB({ id }, options);

  return loadingMessage;
}

export type GetLoadingMessageByFromDBArgs = Pick<LoadingMessage, 'id'>;

async function getLoadingMessageByFromDB(
  args: GetLoadingMessageByFromDBArgs,
  options: DBOptions = {},
): Promise<LoadingMessage | null> {
  const query = db
    .select(`${loadingMessagesTableName}.*`)
    .from(loadingMessagesTableName)
    .first();

  if (args.id) {
    query.where({
      id: args.id,
    });
  }

  maybeAddTransactionToQuery(query, options);

  const loadingMessage: LoadingMessage | null = await query;

  return loadingMessage;
}

export async function getLoadingMessagesByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<LoadingMessage>> {
  const loadingMessages = await getLoadingMessagesByFromDB({ ids }, options);

  return loadingMessages;
}

export type GetLoadingMessagesByFromDBArgs = Readonly<{
  ids: ReadonlyArray<ID>;
}>;

async function getLoadingMessagesByFromDB(
  args: GetLoadingMessagesByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<LoadingMessage>> {
  const query = db
    .select(`${loadingMessagesTableName}.*`)
    .from(loadingMessagesTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const loadingMessages: ReadonlyArray<LoadingMessage> = await query;

  return loadingMessages;
}
