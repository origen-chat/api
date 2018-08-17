import { ID, Identifiable, Timestamps } from '../types';

export type WorkspaceMembership = Readonly<{
  memberId: ID;
  workspaceId: ID;

  role: WorkspaceMembershipRole;
}> &
  Identifiable &
  Timestamps;

export type WorkspaceMembershipRole = 'owner' | 'admin' | 'member';
