import { ID, Timestamps } from '../types';

export type UserWorkspaceSettings = Readonly<{
  workspaceMembershipId: ID;
  configuration: UserWorkspaceSettingsConfiguration;
}> &
  Timestamps;

export type UserWorkspaceSettingsConfiguration = object;
