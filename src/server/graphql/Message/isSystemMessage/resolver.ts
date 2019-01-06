import * as core from '../../../../core';
import { Resolver } from '../../../types';

const resolveIsSystemMessage: Resolver<
  core.messages.Message
> = async message => {
  const isSystemMessage = core.messages.isMessageSentBySystem(message);

  return isSystemMessage;
};

export default resolveIsSystemMessage;
