import { ID, Identifiable, Timestamps } from '../types';

export type UserNotification = Readonly<{
  userId: ID;
  notificationId: ID;
  readAt: Date | null;
}> &
  Identifiable &
  Timestamps;
