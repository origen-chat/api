import { ID, Identifiable, Nullable, Timestamps } from '../types';

export type Channel = NamedChannel | DirectMessagesChannel;

export type NamedChannel = Readonly<{
  name: string;
  type: ChannelType.Named;
  topic: Nullable<string>;
  purpose: Nullable<string>;
}> &
  ChannelSharedData;

type ChannelSharedData = Readonly<{
  workspaceId: ID;
}> &
  Identifiable &
  Timestamps;

export type DirectMessagesChannel = Readonly<{
  type: ChannelType.DirectMessages;
}> &
  ChannelSharedData;

export enum ChannelType {
  Named = 'named',
  DirectMessages = 'directMessages',
}
