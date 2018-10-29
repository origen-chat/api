import { pick } from 'ramda';

import {
  addCreatorToNamedChannel,
  ChannelMembershipRole,
} from '../channelMemberships';
import { addUsersToChannel } from '../channelMemberships/channelMemberships';
import db, { doInTransaction, maybeAddTransactionToQuery } from '../db';
import { DBOptions, Mutable } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { channelsTableName, initialDefaultChannelName } from './constants';
import {
  Channel,
  ChannelPrivacy,
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

export type InsertNamedChannelArgs = Pick<
  NamedChannel,
  'name' | 'type' | 'privacy' | 'isDefault'
> &
  Partial<Pick<NamedChannel, 'topic' | 'purpose'>> &
  Readonly<{ channelCreator: User }> &
  InsertChannelCommonArgs;

type InsertChannelCommonArgs = Readonly<{ workspace: Workspace }>;

export async function insertNamedChannel(
  args: InsertNamedChannelArgs,
  options: DBOptions = {},
): Promise<NamedChannel> {
  const namedChannel = await doInTransaction(
    async transaction => {
      const optionsWithTransaction: DBOptions = { ...options, transaction };
      const doInsertChannelArgs = makeDoInsertChannelArgs(args);

      const channel = (await doInsertChannel(
        doInsertChannelArgs,
        optionsWithTransaction,
      )) as NamedChannel;

      await addCreatorToNamedChannel(
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
  const insertedDirectMessagesChannel = await doInTransaction(
    async transaction => {
      const optionsWithTransaction: DBOptions = { transaction };

      const doInsertChannelArgs = makeDoInsertChannelArgs(args);

      const channel = await doInsertChannel(
        doInsertChannelArgs,
        optionsWithTransaction,
      );
      await addUsersToChannel(
        {
          channel,
          users: args.members,
          role: ChannelMembershipRole.Member,
        },
        optionsWithTransaction,
      );

      return channel;
    },
    { transactionFromBefore: options.transaction },
  );

  return insertedDirectMessagesChannel;
}

function makeDoInsertChannelArgs(args: InsertChannelArgs): DoInsertChannelArgs {
  const doInsertChannelArgs: Mutable<Partial<DoInsertChannelArgs>> = {
    ...pick(['type', 'name', 'topic', 'purpose', 'privacy', 'isDefault'], args),
    workspaceId: args.workspace.id,
  };

  if (args.type === ChannelType.DirectMessages) {
    doInsertChannelArgs.privacy = ChannelPrivacy.Private;
    doInsertChannelArgs.isDefault = false;
  }

  return doInsertChannelArgs as any;
}

export type DoInsertChannelArgs = Pick<
  Channel,
  'type' | 'workspaceId' | 'privacy' | 'isDefault'
> &
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

/**
 * Inserts the initial default channel in a workspace.
 */
export async function insertInitialDefaultChannel(
  workspace: Workspace,
  channelCreator: User,
  options: DBOptions = {},
): Promise<NamedChannel> {
  const args: InsertChannelArgs = {
    workspace,
    type: ChannelType.Named,
    name: initialDefaultChannelName,
    channelCreator,
    privacy: ChannelPrivacy.Public,
    isDefault: true,
  };

  const initialDefaultChannel = await insertChannel(args, options);

  return initialDefaultChannel;
}
