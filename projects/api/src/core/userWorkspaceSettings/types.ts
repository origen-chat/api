import { ID, Identifiable, Timestamps } from '../types';

export type UserWorkspaceSettings = Readonly<{
  userId: ID;
}> &
  Identifiable &
  Timestamps;
