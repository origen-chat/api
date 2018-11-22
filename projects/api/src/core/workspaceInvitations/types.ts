import { ID, Timestamps } from '../types';

export type WorkspaceInvitation = Readonly<{
  inviterId: ID;
}> &
  Timestamps;
