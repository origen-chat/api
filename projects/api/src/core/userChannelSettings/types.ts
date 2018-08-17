import { ID, Identifiable, Timestamps } from '../types';

export type UserChannelSettings = Readonly<{
  userId: ID;
}> &
  Identifiable &
  Timestamps;
