import { WorkspaceInvitationLink } from './types';

export function isWorkspaceInvitationLink(
  value: any,
): value is WorkspaceInvitationLink {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.code &&
    value.workspaceId &&
    (value.deactivatedAt || value.deactivatedAt === null) &&
    (value.expiresAt || value.expiresAt === null)
  );
}
