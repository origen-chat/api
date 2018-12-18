import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { MutationInputArg, Resolver, Root } from '../../../types';
import { NotFoundableEntity, NotFoundError } from '../../errors';
import { withDecodedGlobalIds } from '../../helpers';
import { NodeType } from '../../types';
import { validateSendMessageArgs } from './validation';

export type ResolveBroadcastTypingArgs = MutationInputArg<{
  channelId: core.types.ID;
}>;

export const resolveBroadcastTyping: Resolver<
  Root,
  ResolveBroadcastTypingArgs,
  Readonly<{ channel: core.channels.Channel }>
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  validateSendMessageArgs(args);

  const channel = await context.loaders.channelById.load(args.input.channelId);

  if (!channel) {
    throw new NotFoundError({ entity: NotFoundableEntity.Channel });
  }

  await core.presence.broadcastTyping({ actor: viewer, channel });

  const payload = { channel };

  return payload;
};

const enhancedResolver = withDecodedGlobalIds(
  {
    input: {
      channelId: NodeType.Channel,
      parentMessageId: NodeType.Message,
    },
  },
  resolveBroadcastTyping,
);

export default enhancedResolver;
