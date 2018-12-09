import { jobQueues } from '../jobQueues';
import { WorkspaceInvitation } from './types';

export async function enqueuePostCreateWorkspaceInvitationJob(
  workspaceInvitation: WorkspaceInvitation,
): Promise<void> {
  await jobQueues.postCreateWorkspaceInvitation.add({ workspaceInvitation });
}
