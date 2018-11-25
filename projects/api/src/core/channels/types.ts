import { ID, Identifiable, Timestamps } from '../types';

export type Channel = NamedChannel | DirectMessagesChannel;

export type NamedChannel = Readonly<{
  name: string;
  type: ChannelType.Named;
  isDefault: boolean;
  privacy: ChannelPrivacy;
  topic: string | null;
  purpose: string | null;
}> &
  ChannelSharedData;

type ChannelSharedData = Readonly<{
  workspaceId: ID;
}> &
  Identifiable &
  Timestamps;

export type DirectMessagesChannel = Readonly<{
  type: ChannelType.DirectMessages;
  isDefault: false;
  privacy: ChannelPrivacy.Private;
  name: null;
  topic: null;
  purpose: null;
}> &
  ChannelSharedData;

export enum ChannelType {
  Named = 'named',
  DirectMessages = 'directMessages',
}

export enum ChannelPrivacy {
  Public = 'public',
  Private = 'private',
}
