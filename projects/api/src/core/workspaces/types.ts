import { Identifiable, Nullable, Timestamps } from '../types';

export type Workspace = Readonly<{
  name: string;
  displayName: string;
  description: Nullable<string>;
}> &
  Identifiable &
  Timestamps;
