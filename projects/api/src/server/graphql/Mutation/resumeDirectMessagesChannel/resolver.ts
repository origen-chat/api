import { channels, types, users, workspaces } from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { Resolver, Root } from '../../../types';
import { NotFoundError } from '../../errors';

export type ResolveResumeDirectMessagesChannelArgs = Readonly<{
  input: Readonly<{
    workspaceId: types.ID;
    memberIds: ReadonlyArray<types.ID>;
  }>;
}>;

export const resolveResumeDirectMessagesChannel: Resolver<
  Root,
  ResolveResumeDirectMessagesChannelArgs,
  channels.Channel
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  const workspace = await workspaces.getWorkspaceById(args.input.workspaceId);

  if (!workspace) {
    throw new NotFoundError('workspace not found');
  }

  const memberIdsAndViewerId = [...args.input.memberIds, viewer.id];
  const members = await users.getUsersByIds(memberIdsAndViewerId);

  const directMessagesChannel = await channels.getOrInsertDirectMessagesChannel(
    workspace,
    members,
  );

  return directMessagesChannel;
};

export default resolveResumeDirectMessagesChannel;
