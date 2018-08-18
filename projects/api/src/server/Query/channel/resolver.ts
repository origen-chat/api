import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

import { channels, types } from '../../../core';
import { NotFoundError } from '../../errors';
import { isViewerAuthenticated } from '../../helpers';
import { Resolver, Root } from '../../types';

export type ResolveChannelArgs = Readonly<{ id: types.ID }>;

export const resolveChannel: Resolver<
  Root,
  ResolveChannelArgs,
  channels.Channel
> = async (root, args, context) => {
  const { id: channelId } = args;

  if (!isViewerAuthenticated(context)) {
    throw new AuthenticationError('unauthenticated');
  }

  const channel = await channels.getChannelById(channelId);

  if (!channel) {
    throw new NotFoundError('channel not found');
  }

  if (!channels.canSeeChannel(context.viewer, channel)) {
    throw new ForbiddenError('forbidden');
  }

  return channel;
};

export default resolveChannel;
