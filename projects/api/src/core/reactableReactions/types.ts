import { ID, Identifiable, InsertedAtField } from '../types';

export type ReactableReaction = Readonly<{
  messageId: ID;
  reactionId: ID;
  /**
   * The id of the user that reacted to the reactable.
   */
  authorId: ID;
}> &
  Identifiable &
  InsertedAtField;
