import { jobQueues } from '../jobQueues';
import { Message } from '../messages';
import { JobProcessor } from './types';

export type ProcessEditedMessageNotificationsJobData = Readonly<{
  message: Message;
}>;

export const processEditedMessageNotificationsJob: JobProcessor<
  ProcessEditedMessageNotificationsJobData
> = async job => {
  // TODO:
  console.log('edited message:', job.data);
};

export function startListeningOnEditedMessageNotificationsQueue(): void {
  jobQueues.editedMessageNotifications.process(
    processEditedMessageNotificationsJob,
  );
}
