import { RichText } from '../richText';
import { ID, Identifiable, Nullable, Timestamps } from '../types';

export type Message = Readonly<{
  channelID: Nullable<ID>;
  senderId: ID;
  recipientId: Nullable<ID>;

  parentMessageId: Nullable<ID>;

  content: RichText;
}> &
  Identifiable &
  Timestamps;
