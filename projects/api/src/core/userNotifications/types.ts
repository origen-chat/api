import { ID, Identifiable, Timestamp, Timestamps } from '../types';

export type UserNotification = Readonly<{
  userId: ID;
  notificationId: ID;
  readAt: Timestamp | null;
}> &
  Identifiable &
  Timestamps;
