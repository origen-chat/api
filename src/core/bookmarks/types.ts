import { ID, Identifiable, InsertedAtField } from '../types';

export type Bookmark = Readonly<{
  messageId: ID;
  authorId: ID;
}> &
  Identifiable &
  InsertedAtField;
