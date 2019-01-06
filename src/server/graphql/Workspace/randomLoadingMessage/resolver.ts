import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { Resolver } from '../../../types';
import { AuthorizationError } from '../../errors';

type ResolveChannelArgs = Readonly<{}>;

export const resolveRandomLoadingMessage: Resolver<
  core.workspaces.Workspace,
  ResolveChannelArgs,
  core.loadingMessages.LoadingMessage | null
> = async (workspace, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  if (
    !(await core.loadingMessages.canSeeLoadingMessages({
      actor: viewer,
      workspace,
    }))
  ) {
    throw new AuthorizationError();
  }

  const loadingMessage = await core.loadingMessages.getRandomLoadingMessage(
    workspace,
  );

  return loadingMessage;
};

export default resolveRandomLoadingMessage;
