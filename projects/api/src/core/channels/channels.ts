import db, { transact } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { getWorkspaceById, Workspace } from '../workspaces';
import { channelsTableName } from './constants';
import { getDirectMessagesChannelByMembers } from './get';
import { insertChannel } from './insertion';
import {
  Channel,
  ChannelType,
  DirectMessagesChannel,
  NamedChannel,
} from './types';

export async function getWorkspace(channel: Channel): Promise<Workspace> {
  const workspace = (await getWorkspaceById(channel.workspaceId))!;

  return workspace;
}

export async function getOrInsertDirectMessagesChannel(
  workspace: Workspace,
  members: ReadonlyArray<User>,
  options: DBOptions = {},
): Promise<DirectMessagesChannel> {
  const namedChannel = await transact(
    async transaction => {
      const optionsWithTransaction: DBOptions = { transaction };

      const existingChannel = await getDirectMessagesChannelByMembers(
        members,
        optionsWithTransaction,
      );

      if (existingChannel) {
        return existingChannel;
      }

      const insertedChannel = await insertChannel(
        {
          workspace,
          type: ChannelType.DirectMessages,
          members,
        },
        optionsWithTransaction,
      );

      return insertedChannel;
    },
    { transactionFromBefore: options.transaction },
  );

  return namedChannel;
}

export type UpdateChannelArgs = Partial<
  Pick<NamedChannel, 'name' | 'topic' | 'purpose'>
>;

export async function updateChannel(
  channel: Channel,
  args: UpdateChannelArgs,
): Promise<Channel> {
  const updatedChannel: Channel = await db(channelsTableName)
    .update(args)
    .where({ id: channel.id })
    .returning('*');

  return updatedChannel;
}

export async function deleteChannel(channel: Channel): Promise<Channel> {
  await db
    .delete()
    .from(channelsTableName)
    .where({ id: channel.id });

  return channel;
}
