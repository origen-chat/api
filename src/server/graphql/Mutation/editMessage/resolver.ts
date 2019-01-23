import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { MutationInputArg, Resolver, Root } from '../../../types';
import {
  AuthorizationError,
  NotFoundableEntity,
  NotFoundError,
} from '../../errors';
import { withDecodedGlobalIds } from '../../helpers';
import { NodeType } from '../../types';

import { validateEditMessageArgs } from './validation';

export type ResolveEditMessageArgs = MutationInputArg<{
  messageId: core.types.ID;
  content: object | undefined;
}>;

export const resolveEditMessage: Resolver<
  Root,
  ResolveEditMessageArgs,
  Readonly<{ message: core.messages.Message }>
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  validateEditMessageArgs(args);

  const message = await context.loaders.messageById.load(args.input.messageId);

  if (!message) {
    throw new NotFoundError({ entity: NotFoundableEntity.Message });
  }

  if (!core.messages.canEditMessage({ actor: viewer, message })) {
    throw new AuthorizationError();
  }

  const content = args.input.content;

  if (content) {
    core.richText.validateRichText(content);
  }

  const channel = await context.loaders.channelById.load(message.channelId);

  if (!channel) {
    throw new NotFoundError({ entity: NotFoundableEntity.Channel });
  }

  const editMessageArgs: core.messages.EditMessageArgs = {
    content: content as any,
    channel,
  };

  const editedMessage = await core.messages.editMessage(
    message,
    editMessageArgs,
  );

  const payload = { message: editedMessage };

  return payload;
};

const enhancedResolver = withDecodedGlobalIds(
  {
    input: {
      messageId: NodeType.Message,
    },
  },
  resolveEditMessage,
);

export default enhancedResolver;
