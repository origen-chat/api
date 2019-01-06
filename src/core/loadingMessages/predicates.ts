import { CustomLoadingMessage, LoadingMessage } from './types';

export function isLoadingMessage(value: any): value is LoadingMessage {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.message &&
    (value.authorId || value.authorId === null) &&
    (value.workspaceId || value.workspaceId === null) &&
    (value.category || value.category === null)
  );
}

export function isCustomLoadingMessage(
  loadingMessage: LoadingMessage,
): loadingMessage is CustomLoadingMessage {
  return !!loadingMessage.workspaceId;
}
