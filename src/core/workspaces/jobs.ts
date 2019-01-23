import { jobQueues } from '../jobQueues';

import { Workspace } from './types';

export async function enqueuePostCreateWorkspaceJob(
  workspace: Workspace,
): Promise<void> {
  await jobQueues.postCreateWorkspace.add({ workspace });
}
