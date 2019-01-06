import { Identifiable, Timestamps } from '../types';

export type Workspace = Readonly<{
  name: string;
  displayName: string;
  description: string | null;
}> &
  Identifiable &
  Timestamps;
