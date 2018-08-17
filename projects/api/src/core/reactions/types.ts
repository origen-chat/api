import { ID, Identifiable, Nullable, Timestamps } from '../types';

export type Reaction = Readonly<{
  messageId: Nullable<ID>;
  type: ReactionType;
}> &
  Identifiable &
  Timestamps;

export type ReactionType = string;
