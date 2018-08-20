import { ID, Identifiable, Nullable, Timestamps } from '../types';

export type Channel = Readonly<{
  name: string;
  workspaceId: ID;
  directMessages: boolean;
  topic: Nullable<string>;
  purpose: Nullable<string>;
}> &
  Identifiable &
  Timestamps;
