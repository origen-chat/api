import db from '../db';
import { ID, Nullable } from '../types';
import { User } from '../users';
import { getWorkspaceById, Workspace } from '../workspaces';
import { channelsTableName } from './constants';
import { Channel, NamedChannel } from './types';

export async function getChannelById(id: ID): Promise<Nullable<Channel>> {
  return getChannelBy({ id });
}

type GetChannelByArgs = Pick<Channel, 'id'>;

async function getChannelBy(
  args: GetChannelByArgs,
): Promise<Nullable<Channel>> {
  const channel: Nullable<Channel> = await db
    .select('*')
    .from(channelsTableName)
    .where(args)
    .first();

  return channel;
}

export async function getWorkspace(channel: Channel): Promise<Workspace> {
  const workspace = (await getWorkspaceById(channel.workspaceId))!;

  return workspace;
}

export type InsertChannelArgs = Pick<Channel, 'type' | 'workspaceId'> &
  (
    | (Pick<NamedChannel, 'name'> &
        Partial<Pick<NamedChannel, 'topic' | 'purpose'>>)
    | Readonly<{ members: ReadonlyArray<User> }>);

export async function insertChannel(args: InsertChannelArgs): Promise<Channel> {
  const channel: Channel = await db
    .insert(args)
    .into(channelsTableName)
    .returning('*');

  return channel;
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
