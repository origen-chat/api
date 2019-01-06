import { ID, Timestamps } from '../types';

export type UserChannelSettings = Readonly<{
  channelMembershipId: ID;

  muted: boolean;
}> &
  Timestamps;
