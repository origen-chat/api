import { Channel } from '../channels';
import { insertIntoDB } from '../db';
import { Message } from '../messages';
import { DBOptions } from '../types';
import { User } from '../users';
import { channelPinsTableName } from './constants';
import { ChannelPin } from './types';

export type CreateChannelPinArgs = InsertChannelPinIntoDBArgs;

export async function createChannelPin(
  args: CreateChannelPinArgs,
  options: DBOptions = {},
): Promise<ChannelPin> {
  const channelPin = await insertChannelPinIntoDB(args, options);

  return channelPin;
}

type InsertChannelPinIntoDBArgs = Readonly<{
  channel: Channel;
  message: Message;
  author: User;
}>;

async function insertChannelPinIntoDB(
  args: InsertChannelPinIntoDBArgs,
  options: DBOptions = {},
): Promise<ChannelPin> {
  const channelPin = await doInsertChannelPinIntoDB(
    {
      channelId: args.channel.id,
      messageId: args.message.id,
      authorId: args.author.id,
    },
    options,
  );

  return channelPin;
}

type DoInsertChannelPinIntoDBArgs = Pick<
  ChannelPin,
  'channelId' | 'messageId' | 'authorId'
>;

async function doInsertChannelPinIntoDB(
  args: DoInsertChannelPinIntoDBArgs,
  options: DBOptions = {},
): Promise<ChannelPin> {
  const channelPin = await insertIntoDB(
    { data: args, tableName: channelPinsTableName },
    options,
  );

  return channelPin;
}
