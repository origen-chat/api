import { ID, Identifiable, Timestamps } from '../types';

export type Notification = NewMessageNotification | NewReactionNotification;

export type NewMessageNotification = Readonly<{
  action: NotificationAction.NewMessage;
  data: Readonly<{
    messageId: ID;
  }>;
}> &
  NotificationSharedData;

type NotificationSharedData = Identifiable & Timestamps;

export type NewReactionNotification = Readonly<{
  action: NotificationAction.NewReaction;
  data: Readonly<{
    reactionId: ID;
  }>;
}> &
  NotificationSharedData;

export enum NotificationAction {
  NewMessage = 'newMessage',
  NewReaction = 'newReaction',
}
