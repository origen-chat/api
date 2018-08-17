import { ID, Identifiable, Nullable, Timestamps } from '../types';

export type Channel = Readonly<{
  name: string;
  workspaceId: ID;
  topic: Nullable<string>;
  purpose: Nullable<string>;
}> &
  Identifiable &
  Timestamps;
