import { pick } from 'ramda';

import { addCreatorToChannel } from '../channelMemberships';
import db, { maybeAddTransactionToQuery, transact } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { channelsTableName } from './constants';
import {
  Channel,
  ChannelType,
  DirectMessagesChannel,
  NamedChannel,
} from './types';

export type InsertChannelArgs =
  | InsertNamedChannelArgs
  | InsertDirectMessagesChannelArgs;

/**
 * Inserts a channel.
 */
export async function insertChannel(
  args: InsertNamedChannelArgs,
  options?: DBOptions,
): Promise<NamedChannel>;

export async function insertChannel(
  args: InsertDirectMessagesChannelArgs,
  options?: DBOptions,
): Promise<DirectMessagesChannel>;

export async function insertChannel(
  args: InsertChannelArgs,
  options: DBOptions = {},
): Promise<Channel> {
  let channel;

  if (args.type === ChannelType.Named) {
    channel = await insertNamedChannel(args, options);
  } else {
    channel = await insertDirectMessagesChannel(args, options);
  }

  return channel;
}

export type InsertNamedChannelArgs = Pick<NamedChannel, 'name' | 'type'> &
  Partial<Pick<NamedChannel, 'topic' | 'purpose'>> &
  Readonly<{ channelCreator: User }> &
  InsertChannelCommonArgs;

type InsertChannelCommonArgs = Readonly<{ workspace: Workspace }>;

export async function insertNamedChannel(
  args: InsertNamedChannelArgs,
  options: DBOptions = {},
): Promise<Channel> {
  const namedChannel = await transact(
    async transaction => {
      const doInsertChannelArgs = makeDoInsertChannelArgs(args);
      const optionsWithTransaction: DBOptions = { ...options, transaction };

      const channel = await doInsertChannel(
        doInsertChannelArgs,
        optionsWithTransaction,
      );

      await addCreatorToChannel(
        channel,
        args.channelCreator,
        optionsWithTransaction,
      );

      return channel;
    },
    { transactionFromBefore: options.transaction },
  );

  return namedChannel;
}

export type InsertDirectMessagesChannelArgs = Pick<
  DirectMessagesChannel,
  'type'
> &
  Readonly<{ members: ReadonlyArray<User> }> &
  InsertChannelCommonArgs;

export async function insertDirectMessagesChannel(
  args: InsertDirectMessagesChannelArgs,
  options: DBOptions = {},
): Promise<Channel> {
  const doInsertChannelArgs = makeDoInsertChannelArgs(args);
  const channel = await doInsertChannel(doInsertChannelArgs, options);

  return channel;
}

function makeDoInsertChannelArgs(args: InsertChannelArgs): DoInsertChannelArgs {
  const doInsertChannelArgs: DoInsertChannelArgs = {
    ...pick(['type', 'name', 'topic', 'purpose'], args),
    workspaceId: args.workspace.id,
  };

  return doInsertChannelArgs;
}

export type DoInsertChannelArgs = Pick<Channel, 'type' | 'workspaceId'> &
  Partial<Pick<NamedChannel, 'name' | 'topic' | 'purpose'>>;

export async function doInsertChannel(
  args: DoInsertChannelArgs,
  options: DBOptions = {},
): Promise<Channel> {
  const query = db
    .insert(args)
    .into(channelsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [channel] = await query;

  return channel;
}
