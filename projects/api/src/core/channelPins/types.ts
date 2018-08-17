import { ID, Identifiable, Timestamps } from '../types';

export type ChannelPin = Readonly<{
  channelId: ID;
  messageId: ID;
}> &
  Identifiable &
  Timestamps;
