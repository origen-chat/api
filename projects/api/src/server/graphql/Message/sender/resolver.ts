import * as core from '../../../../core';
import { Resolver } from '../../../types';

const resolveSender: Resolver<core.messages.Message> = async (
  message,
  args,
  context,
) => {
  let sender: core.actors.Actor;

  if (core.messages.isMessageSentByUser(message)) {
    sender = (await context.loaders.userById.load(
      message.userSenderId,
    )) as core.users.User;
  } else {
    sender = (await context.loaders.botById.load(
      message.botSenderId,
    )) as core.bots.Bot;
  }

  return sender;
};

export default resolveSender;
