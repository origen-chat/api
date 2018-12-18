import { jobQueues } from '../jobQueues';
import { NamedChannel } from './types';

export async function enqueuePostCreateNamedChannelJob(
  namedChannel: NamedChannel,
): Promise<void> {
  await jobQueues.postCreateNamedChannel.add({ namedChannel });
}
