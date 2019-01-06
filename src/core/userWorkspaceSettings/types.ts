import { ID, Timestamps } from '../types';

export type UserWorkspaceSettings = Readonly<{
  workspaceMembershipId: ID;

  doNotDisturbFrom: any;
  doNotDisturbTo: any;
}> &
  Timestamps;
