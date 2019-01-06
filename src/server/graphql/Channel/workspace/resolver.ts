import * as core from '../../../../core';
import { Resolver } from '../../../types';

const resolveWorkspace: Resolver<core.channels.Channel> = async (
  channel,
  args,
  context,
) => {
  const workspace = await context.loaders.workspaceById.load(
    channel.workspaceId,
  );

  return workspace;
};

export default resolveWorkspace;
