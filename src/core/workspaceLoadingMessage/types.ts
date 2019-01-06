import { ID, InsertedAtField } from '../types';

export type WorkspaceLoadingMessage = Readonly<{
  loadingMessageId: ID;
  workspaceId: ID;
  enabled: boolean;
}> &
  InsertedAtField;
