import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { channels, workspaces } from '../../../../core';
import { isViewerAuthenticated } from '../../../helpers';
import { Resolver } from '../../../types';
import { NotFoundError } from '../../errors';

export type ResolveChannelArgs = Readonly<{ name: string }>;

const resolveChannel: Resolver<
  workspaces.Workspace,
  ResolveChannelArgs,
  channels.Channel
> = async (workspace, args, context) => {
  const { name: channelName } = args;

  if (!isViewerAuthenticated(context)) {
    throw new AuthenticationError('unauthenticated');
  }

  const channel = await channels.getChannelByWorkspaceAndName(
    workspace,
    channelName,
  );

  if (!channel) {
    throw new NotFoundError('channel not found');
  }

  if (!channels.canSeeChannel(context.viewer, channel)) {
    throw new ForbiddenError('forbidden');
  }

  return channel;
};

export default resolveChannel;
