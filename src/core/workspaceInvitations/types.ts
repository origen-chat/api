import { Email, ID, Identifiable, Timestamps } from '../types';

export type WorkspaceInvitation = Readonly<
  | { inviteeId: ID; inviteeEmail: null }
  | { inviteeEmail: Email; inviteeId: null }
> &
  WorkspaceInvitationSharedData;

type WorkspaceInvitationSharedData = Readonly<{
  workspaceId: ID;
  role: WorkspaceInvitationRole;
  inviterId: ID;
  status: WorkspaceInvitationStatus;
}> &
  Identifiable &
  Timestamps;

export enum WorkspaceInvitationRole {
  Admin = 'admin',
  Member = 'member',
  Guest = 'guest',
}

export enum WorkspaceInvitationStatus {
  Accepted = 'accepted',
  Rejected = 'rejected',
  Pending = 'pending',
  Canceled = 'canceled',
}
