import { ForbiddenError } from 'apollo-server-express';

import { channels, types } from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { Resolver, Root } from '../../../types';
import { NotFoundError } from '../../errors';

export type ResolveChannelArgs = Readonly<{ id: types.ID }>;

export const resolveChannel: Resolver<
  Root,
  ResolveChannelArgs,
  channels.Channel
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  const { id: channelId } = args;

  const channel = await channels.getChannelById(channelId);

  if (!channel) {
    throw new NotFoundError('channel not found');
  }

  if (!channels.canSeeChannel(viewer, channel)) {
    throw new ForbiddenError('forbidden');
  }

  return channel;
};

export default resolveChannel;
