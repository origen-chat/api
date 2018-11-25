import { Channel } from '../channels';
import { insertIntoDB } from '../db';
import { DBOptions, Mutable, Nullable } from '../types';
import { isUser } from '../users';
import { messagesTableName } from './constants';
import { enqueueNewMessageNotificationsJob } from './jobs';
import { publishMessageSent } from './publishers';
import { Message, MessageSender } from './types';
import { validateSendMessageArgs } from './validation';

export type CreateMessageArgs = InsertMessageIntoDBArgs;

export async function createMessage(
  args: CreateMessageArgs,
  options: DBOptions = {},
): Promise<Message> {
  await validateSendMessageArgs(args, options);

  const message = await insertMessageIntoDB(args, options);

  publishMessageSent({ message, channel: args.channel });
  await enqueueNewMessageNotificationsJob(message);

  return message;
}

type InsertMessageIntoDBArgs = Pick<Message, 'content'> &
  Readonly<{
    channel: Channel;
    sender: MessageSender;
    parentMessage?: Nullable<Message>;
  }>;

async function insertMessageIntoDB(
  args: InsertMessageIntoDBArgs,
  options: DBOptions = {},
): Promise<Message> {
  const doInsertMessageIntoDBArgs = makeDoInsertMessageIntoDBArgs(args);

  const message = await doInsertMessageIntoDB(
    doInsertMessageIntoDBArgs,
    options,
  );

  return message;
}

function makeDoInsertMessageIntoDBArgs(
  args: InsertMessageIntoDBArgs,
): DoInsertMessageIntoDBArgs {
  const doInsertMessageArgs: Mutable<Partial<DoInsertMessageIntoDBArgs>> = {
    channelId: args.channel.id,
    content: args.content,
    parentMessageId: args.parentMessage ? args.parentMessage.id : null,
  };

  if (isUser(args.sender)) {
    doInsertMessageArgs.userSenderId = args.sender.id;
  } else {
    doInsertMessageArgs.botSenderId = args.sender.id;
  }

  return doInsertMessageArgs as DoInsertMessageIntoDBArgs;
}

export type DoInsertMessageIntoDBArgs = Pick<
  Message,
  'channelId' | 'content' | 'userSenderId' | 'botSenderId'
> &
  Partial<Pick<Message, 'parentMessageId'>>;

export async function doInsertMessageIntoDB(
  args: DoInsertMessageIntoDBArgs,
  options: DBOptions = {},
): Promise<Message> {
  const message = await insertIntoDB(
    {
      data: args,
      tableName: messagesTableName,
    },
    options,
  );

  return message;
}
