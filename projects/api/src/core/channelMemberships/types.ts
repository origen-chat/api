import { ID, Identifiable, Timestamps } from '../types';

export type ChannelMembership = Readonly<{
  memberId: ID;
  channelId: ID;
  role: ChannelMembershipRole;
}> &
  Identifiable &
  Timestamps;

export enum ChannelMembershipRole {
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',
  Guest = 'guest',
}
