import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { MutationInputArg, Resolver, Root } from '../../../types';
import {
  AuthorizationError,
  NotFoundError,
  UserInputError,
} from '../../errors';
import { withDecodedGlobalIds } from '../../helpers';
import { NodeType } from '../../types';
import { validateSendMessageArgs } from './validation';

export type ResolveSendMessageArgs = MutationInputArg<{
  channelId: core.types.ID;
  parentMessageId: core.types.Nullable<core.types.ID>;
  content: string;
}>;

export const resolveSendMessage: Resolver<
  Root,
  ResolveSendMessageArgs,
  core.messages.Message
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  validateSendMessageArgs(args);

  const channel = await context.loaders.channelById.load(args.input.channelId);

  if (!channel) {
    throw new NotFoundError({ entity: 'channel' });
  }

  let parentMessage: core.types.Nullable<core.messages.Message> = null;

  if (args.input.parentMessageId) {
    parentMessage = await context.loaders.messageById.load(
      args.input.parentMessageId,
    );

    if (!parentMessage) {
      throw new NotFoundError({ entity: 'message' });
    }
  }

  let content: core.richText.RichText;

  try {
    content = JSON.parse(args.input.content);
  } catch {
    throw new UserInputError({});
  }

  const insertWorkspaceArgs: core.messages.SendMessageArgs = {
    sender: viewer,
    channel,
    parentMessage,
    content,
  };

  const message = await core.messages.sendMessage(insertWorkspaceArgs);

  return message;
};

const enhancedResolver = withDecodedGlobalIds(
  {
    input: {
      channelId: [NodeType.Channel],
    },
  },
  resolveSendMessage,
);

export default enhancedResolver;
