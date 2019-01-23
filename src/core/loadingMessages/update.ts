import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';

import { loadingMessagesTableName } from './constants';
import { LoadingMessage } from './types';

export type UpdateLoadingMessageArgs = DoUpdateLoadingMessageInDBArgs;

export async function updateLoadingMessage(
  loadingMessage: LoadingMessage,
  args: UpdateLoadingMessageArgs,
  options: DBOptions = {},
): Promise<LoadingMessage> {
  const updatedLoadingMessage = await updateLoadingMessageInDB(
    loadingMessage,
    args,
    options,
  );

  return updatedLoadingMessage;
}

export type UpdateLoadingMessageInDBArgs = DoUpdateLoadingMessageInDBArgs;

export async function updateLoadingMessageInDB(
  loadingMessage: LoadingMessage,
  args: UpdateLoadingMessageInDBArgs,
  options: DBOptions = {},
): Promise<LoadingMessage> {
  const updatedLoadingMessage = await doUpdateLoadingMessageInDB(
    loadingMessage,
    args,
    options,
  );

  return updatedLoadingMessage;
}

export type DoUpdateLoadingMessageInDBArgs = Partial<
  Pick<LoadingMessage, 'message'>
>;

export async function doUpdateLoadingMessageInDB(
  loadingMessage: LoadingMessage,
  args: DoUpdateLoadingMessageInDBArgs,
  options: DBOptions = {},
): Promise<LoadingMessage> {
  const data = {
    ...args,
    updatedAt: new Date(),
  };

  const query = db(loadingMessagesTableName)
    .update(data)
    .where({ id: loadingMessage.id })
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [updatedLoadingMessage] = await query;

  return updatedLoadingMessage;
}
