import { ID, Identifiable, Timestamps } from '../types';

export type Bookmark = Readonly<{
  messageId: ID;
  authorId: ID;
}> &
  Identifiable &
  Timestamps;
