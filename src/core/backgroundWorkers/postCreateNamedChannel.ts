import { NamedChannel } from '../channels';
import { jobQueues } from '../jobQueues';
import { sendMessage } from '../messages';
import { JobProcessor } from './types';

export type ProcessPostCreateNamedChannelJobData = Readonly<{
  namedChannel: NamedChannel;
}>;

export const processPostCreateNamedChannelJob: JobProcessor<
  ProcessPostCreateNamedChannelJobData
> = async job => {
  const { namedChannel } = job.data;

  await sendMessage({
    channel: namedChannel,
    content: { imageUrls: [], richText: { blocks: [{ text: 'welcome!' }] } },
  });
};

export function startListeningOnPostCreateNamedChannelQueue(): void {
  jobQueues.postCreateNamedChannel.process(processPostCreateNamedChannelJob);
}
