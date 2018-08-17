import { Identifiable, Nullable, Timestamps } from '../types';

export type Workspace = Readonly<{
  name: string;
  description: Nullable<string>;
}> &
  Identifiable &
  Timestamps;
