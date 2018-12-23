import { ID, Identifiable, Timestamps } from '../types';

export type WorkspaceInvitationLink = Readonly<{
  workspaceId: ID;
  code: string;
  deactivatedAt: Date | null;
  expiresAt: Date | null;
}> &
  Identifiable &
  Timestamps;
