import { doInTransaction } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { areWorkspaceMembers } from '../workspaceMemberships';
import { Workspace } from '../workspaces';

import { maxUsersInDirectMessagesChannel } from './constants';
import { createDirectMessagesChannel } from './creation';
import { getDirectMessagesChannelByMembers } from './get';
import { DirectMessagesChannel } from './types';

export async function getOrCreateDirectMessagesChannel(
  workspace: Workspace,
  members: ReadonlyArray<User>,
  options: DBOptions = {},
): Promise<DirectMessagesChannel> {
  await validateGetOrCreateDirectMessagesChannelArgs(
    workspace,
    members,
    options,
  );

  const directMessagesChannel = await doGetOrCreateDirectMessagesChannel(
    workspace,
    members,
    options,
  );

  return directMessagesChannel;
}

async function validateGetOrCreateDirectMessagesChannelArgs(
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

async function doGetOrCreateDirectMessagesChannel(
  workspace: Workspace,
  members: ReadonlyArray<User>,
  options: DBOptions = {},
): Promise<DirectMessagesChannel> {
  const directMessagesChannel = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    const existingChannel = await getDirectMessagesChannelByMembers(
      { workspace, members },
      optionsWithTransaction,
    );

    if (existingChannel) {
      return existingChannel;
    }

    const insertedChannel = await createDirectMessagesChannel(
      {
        workspace,
        members,
      },
      optionsWithTransaction,
    );

    return insertedChannel;
  }, options);

  return directMessagesChannel;
}
