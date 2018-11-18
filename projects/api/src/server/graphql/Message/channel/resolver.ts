import * as core from '../../../../core';
import { Resolver } from '../../../types';

const resolveChannel: Resolver<core.messages.Message> = async (
  message,
  args,
  context,
) => {
  const channel = await context.loaders.channelById.load(message.channelId);

  return channel;
};

export default resolveChannel;
