import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { MutationInputArg, Resolver, Root } from '../../../types';
import { NotFoundError } from '../../errors';

export type ResolveResumeDirectMessagesChannelArgs = MutationInputArg<{
  workspaceId: core.types.ID;
  memberIds: ReadonlyArray<core.types.ID>;
}>;

export const resolveResumeDirectMessagesChannel: Resolver<
  Root,
  ResolveResumeDirectMessagesChannelArgs,
  core.channels.DirectMessagesChannel
> = async (root, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  const workspace = await core.workspaces.getWorkspaceById(
    args.input.workspaceId,
  );

  if (!workspace) {
    throw new NotFoundError('workspace not found');
  }

  const memberIdsAndViewerId = [...args.input.memberIds, viewer.id];
  const members = await core.users.getUsersByIds(memberIdsAndViewerId);

  const directMessagesChannel = await core.channels.getOrInsertDirectMessagesChannel(
    workspace,
    members,
  );

  return directMessagesChannel;
};

export default resolveResumeDirectMessagesChannel;
