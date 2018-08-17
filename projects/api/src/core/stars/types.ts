import { ID, Identifiable, Nullable, Timestamps } from '../types';

export type Star = Readonly<{
  messageId: Nullable<ID>;
}> &
  Identifiable &
  Timestamps;
