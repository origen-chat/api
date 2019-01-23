import * as core from '../../../../core';
import { Resolver } from '../../../types';

import { MessageReceivedArgs, MessageReceivedPayload } from './types';

export const resolveMessageReceived: Resolver<
  MessageReceivedPayload,
  MessageReceivedArgs,
  core.messages.Message
> = payload => {
  const { message } = payload;

  return message;
};

export default resolveMessageReceived;
