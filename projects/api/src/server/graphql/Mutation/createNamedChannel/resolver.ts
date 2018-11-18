import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { MutationInputArg, Resolver, Root } from '../../../types';
import { NotFoundError } from '../../errors';
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
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  validateCreateNamedChannelArgs(args);

  const workspace = await context.loaders.workspaceById.load(
    args.input.workspaceId,
  );

  if (!workspace) {
    throw new NotFoundError({ entity: 'workspace' });
  }

  const createNamedChannelArgs: core.channels.InsertChannelArgs = {
    type: core.channels.ChannelType.Named,
    name: args.input.name,
    privacy: args.input.privacy,
    isDefault: false,
    channelCreator: viewer,
    workspace,
  };

  const channel = await core.channels.insertChannel(createNamedChannelArgs);

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
