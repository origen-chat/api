import { jobQueues } from '../jobQueues';
import { Message } from '../messages';
import { JobProcessor } from './types';

export type ProcessNewMessageNotificationsJobData = Readonly<{
  message: Message;
}>;

export const processNewMessageNotificationsJob: JobProcessor<
  ProcessNewMessageNotificationsJobData
> = async job => {
  // TODO:
};

export function startListeningOnNewMessageNotificationsQueue(): void {
  jobQueues.newMessageNotifications.process(processNewMessageNotificationsJob);
}
