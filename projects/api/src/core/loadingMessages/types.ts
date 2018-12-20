import { ID, Identifiable, Timestamps } from '../types';

export type NativeLoadingMessage = Readonly<{
  authorId: null;
  workspaceId: null;
}> &
  LoadingMessageSharedData;

type LoadingMessageSharedData = Readonly<{
  message: string;
}> &
  Identifiable &
  Timestamps;

export type CustomLoadingMessage = Readonly<{
  authorId: ID;
  workspaceId: ID;
}> &
  LoadingMessageSharedData;
