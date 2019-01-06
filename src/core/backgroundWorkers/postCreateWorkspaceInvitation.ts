import { jobQueues } from '../jobQueues';
import { WorkspaceInvitation } from '../workspaceInvitations';
import { JobProcessor } from './types';

export type ProcessPostCreateWorkspaceInvitationJobData = Readonly<{
  workspaceInvitation: WorkspaceInvitation;
}>;

export const processPostCreateWorkspaceInvitationJob: JobProcessor<
  ProcessPostCreateWorkspaceInvitationJobData
> = async job => {
  // TODO:
  console.log('new workspace invitation', job.data);
};

export function startListeningOnPostCreateWorkspaceInvitationQueue(): void {
  jobQueues.postCreateWorkspaceInvitation.process(
    processPostCreateWorkspaceInvitationJob,
  );
}
