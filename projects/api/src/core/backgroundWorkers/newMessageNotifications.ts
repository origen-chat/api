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
  console.log('new message!!', job.data);
};

export function startListeningOnNewMessageNotificationsQueue(): void {
  jobQueues.newMessageNotifications.process(processNewMessageNotificationsJob);
}
