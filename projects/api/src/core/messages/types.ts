import { RichText } from '../richText';
import { ID, Identifiable, Nullable, Timestamps } from '../types';

export type Message = Readonly<{
  channelId: ID;
  senderId: ID;

  parentMessageId: Nullable<ID>;

  content: RichText;
}> &
  Identifiable &
  Timestamps;
