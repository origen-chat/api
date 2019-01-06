import { jobQueues } from '../jobQueues';
import { Message } from '../messages';
import { JobProcessor } from './types';

export type ProcessPostUpdateMessageJobData = Readonly<{
  message: Message;
}>;

export const processPostUpdateMessageJob: JobProcessor<
  ProcessPostUpdateMessageJobData
> = async job => {
  // TODO:
  console.log('edited message:', job.data);
};

export function startListeningOnPostUpdateMessageQueue(): void {
  jobQueues.postUpdateMessage.process(processPostUpdateMessageJob);
}
