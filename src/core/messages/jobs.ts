import { jobQueues } from '../jobQueues';

import { Message } from './types';

export async function enqueuePostCreateMessageJob(
  message: Message,
): Promise<void> {
  await jobQueues.postCreateMessage.add({ message });
}

export async function enqueuePostUpdateMessageJob(
  message: Message,
): Promise<void> {
  await jobQueues.postUpdateMessage.add({ message });
}
