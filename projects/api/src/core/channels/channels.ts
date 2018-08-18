import db from '../db';
import { ID, Nullable } from '../types';
import { getWorkspaceById, Workspace } from '../workspaces';
import { channelsTableName } from './constants';
import { Channel } from './types';

export async function getChannelById(id: ID): Promise<Nullable<Channel>> {
  return getChannelBy({ id });
}

type GetChannelByArgs =
  | Pick<Channel, 'id'>
  | Pick<Channel, 'workspaceId' | 'name'>;

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

export async function getChannelByWorkspaceAndName(
  workspace: Workspace,
  name: string,
): Promise<Nullable<Channel>> {
  return getChannelBy({ workspaceId: workspace.id, name });
}

export async function getWorkspace(channel: Channel): Promise<Workspace> {
  const workspace = (await getWorkspaceById(channel.workspaceId))!;

  return workspace;
}

export type InsertChannelArgs = Pick<Channel, 'name' | 'workspaceId'> &
  Partial<Pick<Channel, 'topic' | 'purpose'>>;

export async function insertChannel(args: InsertChannelArgs): Promise<Channel> {
  const channel: Channel = await db
    .insert(args)
    .into(channelsTableName)
    .returning('*');

  return channel;
}

export type UpdateChannelArgs = Partial<
  Pick<Channel, 'name' | 'topic' | 'purpose'>
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
