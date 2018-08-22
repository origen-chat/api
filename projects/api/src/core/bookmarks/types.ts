import { ID, Identifiable, Nullable, Timestamps } from '../types';

export type Bookmark = Readonly<{
  messageId: Nullable<ID>;
}> &
  Identifiable &
  Timestamps;
