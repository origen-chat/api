import { ID, Identifiable, Timestamps } from '../types';

export type WorkspaceMembership = Readonly<{
  memberId: ID;
  workspaceId: ID;

  /**
   * The role of the member in the workspace.
   */
  role: WorkspaceMembershipRole;
}> &
  Identifiable &
  Timestamps;

/**
 * The membership role in a workspace.
 */
export enum WorkspaceMembershipRole {
  /**
   * The owner of the worspace.
   */
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',
}
