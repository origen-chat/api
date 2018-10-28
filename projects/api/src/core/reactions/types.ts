import { ID, Identifiable, Timestamps, URL } from '../types';

export type Reaction = NativeReaction | CustomReaction;

/**
 * Reaction available to all workspaces.
 */
export type NativeReaction = Readonly<{
  isCustom: false;
  workspaceId: null;
  imageUrl: null;
}> &
  ReactionSharedData;

export type CustomReaction = Readonly<{
  isCustom: true;
  workspaceId: ID;
  imageUrl: URL;
}> &
  ReactionSharedData;

type ReactionSharedData = Readonly<{
  name: string;
}> &
  Identifiable &
  Timestamps;
