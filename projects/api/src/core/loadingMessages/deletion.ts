import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { loadingMessagesTableName } from './constants';
import { LoadingMessage } from './types';

export async function deleteLoadingMessage(
  loadingMessage: LoadingMessage,
  options: DBOptions = {},
): Promise<LoadingMessage> {
  await deleteLoadingMessageFromDB(loadingMessage, options);

  return loadingMessage;
}

export async function deleteLoadingMessageFromDB(
  loadingMessage: LoadingMessage,
  options: DBOptions = {},
): Promise<LoadingMessage> {
  await doDeleteLoadingMessageFromDB(loadingMessage, options);

  return loadingMessage;
}

export async function doDeleteLoadingMessageFromDB(
  loadingMessage: LoadingMessage,
  options: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(loadingMessagesTableName)
    .where({ id: loadingMessage.id });

  maybeAddTransactionToQuery(query, options);

  await query;
}
