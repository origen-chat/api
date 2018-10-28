import { ID, Identifiable, Timestamps } from '../types';

export type ReactableReaction = Readonly<{
  messageId: ID;
  reactionId: ID;
  /**
   * The id of the user that reacted to the reactable.
   */
  authorId: ID;
}> &
  Identifiable &
  Timestamps;
