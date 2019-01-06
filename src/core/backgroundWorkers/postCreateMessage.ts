import { jobQueues } from '../jobQueues';
import { Message } from '../messages';
import { JobProcessor } from './types';

export type ProcessPostCreateMessageJobData = Readonly<{
  message: Message;
}>;

export const processPostCreateMessageJob: JobProcessor<
  ProcessPostCreateMessageJobData
> = async job => {
  // TODO:
  console.log('new message!!', job.data);
};

export function startListeningOnPostCreateMessageQueue(): void {
  jobQueues.postCreateMessage.process(processPostCreateMessageJob);
}
