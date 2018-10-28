import { ID, Identifiable, Timestamps } from '../types';

export type Bot = Readonly<{
  appId: ID;
  name: string;
  displayName: string;
}> &
  Identifiable &
  Timestamps;
