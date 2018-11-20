import { jobQueues } from '../jobQueues';
import { Message } from './types';

export async function enqueueNewMessageNotificationsJob(
  message: Message,
): Promise<void> {
  await jobQueues.newMessageNotifications.add({ message });
}

export async function enqueueEditedMessageNotificationsJob(
  message: Message,
): Promise<void> {
  await jobQueues.editedMessageNotifications.add({ message });
}
