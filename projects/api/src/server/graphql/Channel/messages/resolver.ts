import * as core from '../../../../core';
import { Resolver } from '../../../types';
import { validateMessagesArgs } from './validation';

export type ResolveMessagesArgs = core.types.PaginationArgs;

export const resolveMessages: Resolver<
  core.channels.Channel,
  ResolveMessagesArgs,
  core.types.Connection<core.messages.Message>
> = async (channel, args, context) => {
  validateMessagesArgs(args);

  const messageConnection = await core.messages.getMessageConnection({
    channel,
    paginationArgs: args,
  });

  return messageConnection;
};

const enhancedResolver = resolveMessages;

export default enhancedResolver;
