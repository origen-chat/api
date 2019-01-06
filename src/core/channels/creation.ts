import { pick } from 'ramda';

import {
  addCreatorToNamedChannel,
  ChannelMembershipRole,
} from '../channelMemberships';
import { addUsersToChannel } from '../channelMemberships/channelMemberships';
import { doInTransaction, insertIntoDB } from '../db';
import { DBOptions, Mutable } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { channelsTableName, initialDefaultChannelName } from './constants';
import { enqueuePostCreateNamedChannelJob } from './jobs';
import {
  Channel,
  ChannelPrivacy,
  ChannelType,
  DirectMessagesChannel,
  NamedChannel,
} from './types';

export type CreateNamedChannelArgs = Pick<
  NamedChannel,
  'name' | 'privacy' | 'isDefault'
> &
  Partial<Pick<NamedChannel, 'topic' | 'purpose'>> &
  Readonly<{ channelCreator: User }> &
  CreateChannelCommonArgs;

type CreateChannelCommonArgs = Readonly<{ workspace: Workspace }>;

export async function createNamedChannel(
  args: CreateNamedChannelArgs,
  options: DBOptions = {},
): Promise<NamedChannel> {
  const namedChannel = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    const insertChannelIntoDBArgs: InsertChannelIntoDBArgs = {
      workspace: args.workspace,
      privacy: args.privacy,
      topic: args.topic,
      type: ChannelType.Named,
      isDefault: args.isDefault,
      name: args.name,
    };

    const insertedNamedChannel = (await insertChannelIntoDB(
      insertChannelIntoDBArgs,
      optionsWithTransaction,
    )) as NamedChannel;

    await addCreatorToNamedChannel(
      insertedNamedChannel,
      args.channelCreator,
      optionsWithTransaction,
    );

    return insertedNamedChannel;
  }, options);

  await enqueuePostCreateNamedChannelJob(namedChannel);

  return namedChannel;
}

export type CreateDirectMessagesChannelArgs = Readonly<{
  members: ReadonlyArray<User>;
}> &
  CreateChannelCommonArgs;

export async function createDirectMessagesChannel(
  args: CreateDirectMessagesChannelArgs,
  options: DBOptions = {},
): Promise<DirectMessagesChannel> {
  const directMessagesChannel = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { transaction };

    const insertChannelIntoDBArgs: InsertChannelIntoDBArgs = {
      workspace: args.workspace,
      type: ChannelType.DirectMessages,
      privacy: ChannelPrivacy.Private,
      isDefault: false,
    };

    const insertedDirectMessagesChannel = (await insertChannelIntoDB(
      insertChannelIntoDBArgs,
      optionsWithTransaction,
    )) as DirectMessagesChannel;

    await addUsersToChannel(
      {
        channel: insertedDirectMessagesChannel,
        users: args.members,
        role: ChannelMembershipRole.Member,
      },
      optionsWithTransaction,
    );

    return insertedDirectMessagesChannel;
  }, options);

  return directMessagesChannel;
}

export type InsertChannelIntoDBArgs = Readonly<{
  workspace: Workspace;
}> &
  Pick<
    DoInsertChannelIntoDBArgs,
    'name' | 'isDefault' | 'privacy' | 'purpose' | 'topic' | 'type'
  >;

export async function insertChannelIntoDB(
  args: InsertChannelIntoDBArgs,
  options: DBOptions = {},
): Promise<Channel> {
  const doInsertChannelIntoDBArgs = makeDoInsertChannelIntoDBArgs(args);

  const channel = await doInsertChannelIntoDB(
    doInsertChannelIntoDBArgs,
    options,
  );

  return channel;
}

function makeDoInsertChannelIntoDBArgs(
  args: InsertChannelIntoDBArgs,
): DoInsertChannelIntoDBArgs {
  const doInsertChannelArgs: Mutable<Partial<DoInsertChannelIntoDBArgs>> = {
    ...pick(['type', 'name', 'topic', 'purpose', 'privacy', 'isDefault'], args),
    workspaceId: args.workspace.id,
  };

  if (args.type === ChannelType.DirectMessages) {
    doInsertChannelArgs.privacy = ChannelPrivacy.Private;
    doInsertChannelArgs.isDefault = false;
  }

  return doInsertChannelArgs as any;
}

export type DoInsertChannelIntoDBArgs = Pick<
  Channel,
  'type' | 'workspaceId' | 'privacy' | 'isDefault'
> &
  Partial<Pick<NamedChannel, 'name' | 'topic' | 'purpose'>>;

export async function doInsertChannelIntoDB(
  args: DoInsertChannelIntoDBArgs,
  options: DBOptions = {},
): Promise<Channel> {
  const channel = await insertIntoDB(
    {
      data: args,
      tableName: channelsTableName,
    },
    options,
  );

  return channel;
}

/**
 * Creates the initial default channel in a workspace.
 */
export async function createInitialDefaultChannel(
  workspace: Workspace,
  channelCreator: User,
  options: DBOptions = {},
): Promise<NamedChannel> {
  const args: CreateNamedChannelArgs = {
    workspace,
    name: initialDefaultChannelName,
    channelCreator,
    privacy: ChannelPrivacy.Public,
    isDefault: true,
  };

  const initialDefaultChannel = await createNamedChannel(args, options);

  return initialDefaultChannel;
}
