import db from '../db';
import {
  loadingMessagesTableName,
  NativeLoadingMessageCategory,
} from '../loadingMessages';
import { Workspace } from '../workspaces';
import { workspaceLoadingMessagesTableName } from './constants';

export async function addInitialLoadingMessagesToWorkspace(
  workspace: Workspace,
): Promise<void> {
  const query = `
    INSERT INTO "${workspaceLoadingMessagesTableName}" (
      "workspaceId", "loadingMessageId", "enabled"
    )
    SELECT ?, lm."id", TRUE
      FROM "${loadingMessagesTableName}" AS lm
    LEFT JOIN "${workspaceLoadingMessagesTableName}" AS wlm
      ON wlm."loadingMessageId" = lm."id"
    WHERE
      wlm."workspaceId" <> ? AND
      lm."category"
        IN (
          '${NativeLoadingMessageCategory.Motivational}',
          '${NativeLoadingMessageCategory.ProTip}'
        );
    GROUP BY lm."id";
  `;

  await db.raw(query, [workspace.id, workspace.id]);
}
