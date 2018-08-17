import { ID, Identifiable, Timestamps } from '../types';

export type Notification = Identifiable & NotificationData & Timestamps;

type NotificationData =
  | NewMessageNotificationData
  | NewReactionNotificationData;

type NewMessageNotificationData = Readonly<{
  action: 'new_message';
  data: Readonly<{
    messageId: ID;
  }>;
}>;

type NewReactionNotificationData = Readonly<{
  action: 'new_reaction';
  data: Readonly<{
    reactionId: ID;
  }>;
}>;
