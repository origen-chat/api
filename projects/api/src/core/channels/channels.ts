import { doInTransaction } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { areWorkspaceMembers } from '../workspaceMemberships';
import { getWorkspaceById, Workspace } from '../workspaces';
import { maxUsersInDirectMessagesChannel } from './constants';
import { getDirectMessagesChannelByMembers } from './get';
import { insertChannel } from './insertion';
import { Channel, ChannelType, DirectMessagesChannel } from './types';

export async function getWorkspace(channel: Channel): Promise<Workspace> {
  const workspace = (await getWorkspaceById(channel.workspaceId))!;

  return workspace;
}

export async function getOrInsertDirectMessagesChannel(
  workspace: Workspace,
  members: ReadonlyArray<User>,
  options: DBOptions = {},
): Promise<DirectMessagesChannel> {
  await validateGetOrInsertDirectMessagesChannelArgs(
    workspace,
    members,
    options,
  );

  const directMessagesChannel = await doGetOrInsertDirectMessagesChannel(
    workspace,
    members,
    options,
  );

  return directMessagesChannel;
}

async function validateGetOrInsertDirectMessagesChannelArgs(
  workspace: Workspace,
  members: ReadonlyArray<User>,
  options: DBOptions,
): Promise<void> {
  if (members.length === 0) {
    throw new Error('direct messages channel must have at least one member');
  }

  if (members.length > maxUsersInDirectMessagesChannel) {
    throw new Error('too many users for a direct messages channel');
  }

  if (!areWorkspaceMembers(workspace, members, options)) {
    throw new Error('at least one user is not a workspace member');
  }
}

async function doGetOrInsertDirectMessagesChannel(
  workspace: Workspace,
  members: ReadonlyArray<User>,
  options: DBOptions = {},
): Promise<DirectMessagesChannel> {
  const directMessagesChannel = await doInTransaction(async transaction => {
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
  }, options);

  return directMessagesChannel;
}
