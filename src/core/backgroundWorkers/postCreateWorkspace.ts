import { jobQueues } from '../jobQueues';
import { addInitialLoadingMessagesToWorkspace } from '../workspaceLoadingMessage';
import { Workspace } from '../workspaces';
import { JobProcessor } from './types';

export type ProcessPostCreateWorkspaceJobData = Readonly<{
  workspace: Workspace;
}>;

export const processPostCreateWorkspaceJob: JobProcessor<
  ProcessPostCreateWorkspaceJobData
> = async job => {
  const { workspace } = job.data;

  await addInitialLoadingMessagesToWorkspace(workspace);
};

export function startListeningOnPostCreateWorkspaceQueue(): void {
  jobQueues.postCreateWorkspace.process(processPostCreateWorkspaceJob);
}
