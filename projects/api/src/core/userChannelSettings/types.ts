import { ID, Identifiable, Timestamps } from '../types';

export type UserChannelSettings = Readonly<{
  channelMembershipId: ID;
  configuration: UserChannelSettingsConfiguration;
}> &
  Identifiable &
  Timestamps;

export type UserChannelSettingsConfiguration = object;
