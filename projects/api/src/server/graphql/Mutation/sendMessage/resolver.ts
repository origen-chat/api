import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { MutationInputArg, Resolver, Root } from '../../../types';
import { NotFoundableEntity, NotFoundError } from '../../errors';
import { withDecodedGlobalIds } from '../../helpers';
import { NodeType } from '../../types';
import { validateSendMessageArgs } from './validation';

export type ResolveSendMessageArgs = MutationInputArg<{
  channelId: core.types.ID;
  parentMessageId: core.types.ID | null;
  content: object;
}>;

export const resolveSendMessage: Resolver<
  Root,
  ResolveSendMessageArgs,
  Readonly<{ message: core.messages.Message }>
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  validateSendMessageArgs(args);

  const channel = await context.loaders.channelById.load(args.input.channelId);

  if (!channel) {
    throw new NotFoundError({ entity: NotFoundableEntity.Channel });
  }

  let parentMessage: core.types.Nullable<core.messages.Message> = null;

  if (args.input.parentMessageId) {
    parentMessage = await context.loaders.messageById.load(
      args.input.parentMessageId,
    );

    if (!parentMessage) {
      throw new NotFoundError({ entity: NotFoundableEntity.Message });
    }
  }

  const content = args.input.content;

  core.richText.validateRichText(content);

  const sendMessageArgs: core.messages.SendMessageArgs = {
    sender: viewer,
    channel,
    parentMessage,
    content: content as any,
  };

  const message = await core.messages.sendMessage(sendMessageArgs);

  const payload = { message };

  return payload;
};

const enhancedResolver = withDecodedGlobalIds(
  {
    input: {
      channelId: NodeType.Channel,
      parentMessageId: NodeType.Message,
    },
  },
  resolveSendMessage,
);

export default enhancedResolver;
