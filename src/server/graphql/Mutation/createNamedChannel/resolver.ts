import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { MutationInputArg, Resolver, Root } from '../../../types';
import { NotFoundableEntity, NotFoundError } from '../../errors';
import { withDecodedGlobalIds } from '../../helpers';
import { NodeType } from '../../types';

import { validateCreateNamedChannelArgs } from './validation';

export type ResolveCreateNamedChannelArgs = MutationInputArg<{
  name: string;
  privacy: core.channels.ChannelPrivacy;
  workspaceId: core.types.ID;
}>;

export const resolveCreateNamedChannel: Resolver<
  Root,
  ResolveCreateNamedChannelArgs,
  Readonly<{ channel: core.channels.NamedChannel }>
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context, {
    allowed: { user: true, bot: false },
  });

  validateCreateNamedChannelArgs(args);

  const workspace = await context.loaders.workspaceById.load(
    args.input.workspaceId,
  );

  if (!workspace) {
    throw new NotFoundError({ entity: NotFoundableEntity.Workspace });
  }

  const createNamedChannelArgs: core.channels.CreateNamedChannelArgs = {
    name: args.input.name,
    privacy: args.input.privacy,
    isDefault: false,
    channelCreator: viewer,
    workspace,
  };

  const channel = await core.channels.createNamedChannel(
    createNamedChannelArgs,
  );

  const payload = { channel };

  return payload;
};

const enhancedResolver = withDecodedGlobalIds(
  {
    input: {
      workspaceId: NodeType.Workspace,
    },
  },
  resolveCreateNamedChannel,
);

export default enhancedResolver;
