import { ID, Identifiable, InsertedAtField } from '../types';

export type ChannelPin = Readonly<{
  channelId: ID;
  messageId: ID;
  authorId: ID;
}> &
  Identifiable &
  InsertedAtField;
