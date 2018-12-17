import { isBot } from '../bots';
import { isChannelMember } from '../channelMemberships/predicates';
import { Channel } from '../channels';
import { DBOptions } from '../types';
import { EditMessageArgs, SendMessageArgs } from './messages';
import { Message, MessageSender } from './types';

export async function validateSendMessageArgs(
  args: SendMessageArgs,
  options: DBOptions = {},
): Promise<void> {
  validateOnlyVisibleTo(args);

  await validateSenderCanSendMessage(
    { sender: args.sender, channel: args.channel },
    options,
  );

  if (args.parentMessage) {
    validateParentMessage({
      parentMessage: args.parentMessage,
      channel: args.channel,
    });
  }
}

function validateOnlyVisibleTo(args: SendMessageArgs): void {
  if (args.onlyVisibleTo && (!args.sender || !isBot(args.sender))) {
    throw new Error('users cannot send only visible to messages');
  }
}

type ValidateSenderCanSendMessageArgs = Readonly<{
  sender?: MessageSender | null;
  channel: Channel;
}>;

async function validateSenderCanSendMessage(
  args: ValidateSenderCanSendMessageArgs,
  options: DBOptions = {},
): Promise<void> {
  if (!args.sender) {
    return;
  }

  if (!(await isChannelMember(args.channel, args.sender, options))) {
    throw new Error('sender cannot send messages to this channel');
  }
}

type ValidateParentMessageArgs = Readonly<{
  parentMessage: Message;
  channel: Channel;
}>;

function validateParentMessage(args: ValidateParentMessageArgs): void {
  if (args.parentMessage.channelId !== args.channel.id) {
    throw new Error('parent message does not belong to same channel');
  }
}

export async function validateEditMessageArgs(
  args: EditMessageArgs,
  options: DBOptions = {},
): Promise<void> {}
