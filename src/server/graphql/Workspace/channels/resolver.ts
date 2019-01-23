import * as core from '../../../../core';
import { Resolver } from '../../../types';

import { validateChannelsArgs } from './validation';

export type ResolveChannelsArgs = Readonly<{
  type?: core.channels.ChannelType | null;
}> &
  core.types.PaginationArgs;

export const resolveChannels: Resolver<
  core.workspaces.Workspace,
  ResolveChannelsArgs,
  core.types.Connection<core.channels.Channel>
> = async (workspace, args, context) => {
  validateChannelsArgs(args);

  const type = args.type || undefined;

  const channelConnection = await core.channels.getChannelConnection({
    workspace,
    type,
    paginationArgs: args,
  });

  return channelConnection;
};

const enhancedResolver = resolveChannels;

export default enhancedResolver;
