import { ID, Identifiable, Timestamps } from '../types';

export type UserGroup = Readonly<{
  workspaceId: ID;
  name: string;
  description: string | null;
}> &
  Identifiable &
  Timestamps;
