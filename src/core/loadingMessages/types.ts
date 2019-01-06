import { ID, Identifiable, Timestamps } from '../types';

export type LoadingMessage = NativeLoadingMessage | CustomLoadingMessage;

export type NativeLoadingMessage = Readonly<{
  authorId: null;
  workspaceId: null;
  category: NativeLoadingMessageCategory;
}> &
  LoadingMessageSharedData;

export enum NativeLoadingMessageCategory {
  ProTip = 'proTip',
  Motivational = 'motivational',
}

type LoadingMessageSharedData = Readonly<{
  message: string;
}> &
  Identifiable &
  Timestamps;

export type CustomLoadingMessage = Readonly<{
  authorId: ID;
  workspaceId: ID;
  category: null;
}> &
  LoadingMessageSharedData;
