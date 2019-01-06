import { Actor } from '../actors';
import { ID, Identifiable, InsertedAtField } from '../types';

export type ReactableReaction = Readonly<{
  messageId: ID;
  reactionId: ID;

  userAuthorId: ID | null;
  botAuthorId: ID | null;
}> &
  Identifiable &
  InsertedAtField;

export type ReactableReactionAuthor = Actor;
