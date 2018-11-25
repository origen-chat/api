import { WorkspaceInvitation } from './types';

export function isWorkspaceInvitation(
  value: any,
): value is WorkspaceInvitation {
  return typeof value === 'object' && value && value.id && value.inviterId;
}
