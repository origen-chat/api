import { WorkspaceLoadingMessage } from './types';

export function isWorkspaceLoadingMessage(
  value: any,
): value is WorkspaceLoadingMessage {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.workspaceId &&
    value.loadingMessageId &&
    (value.enabled === true || value.enabled === false)
  );
}
