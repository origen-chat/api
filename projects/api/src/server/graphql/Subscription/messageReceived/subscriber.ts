import { withFilter } from 'graphql-subscriptions';

import * as core from '../../../../core';
import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { Resolver, Root } from '../../../types';
import { withDecodedGlobalIds } from '../../helpers';
import { NodeType } from '../../types';
import { MessageReceivedArgs, MessageReceivedPayload } from './types';

const filter: Resolver<MessageReceivedPayload, MessageReceivedArgs> = async (
  payload,
  args,
  context,
) => {
  if (payload.channel.workspaceId !== args.workspaceId) {
    return false;
  }

  // if (
  //   !(await core.channelMemberships.isChannelMember(
  //     payload.channel,
  //     // eslint-disable-next-line typescript/no-non-null-assertion
  //     context.viewer!,
  //   ))
  // ) {
  //   return false;
  // }

  return true;
};

const globalIdsArgsSchema = {
  workspaceId: NodeType.Workspace,
};

const enhancedFilter = withDecodedGlobalIds(globalIdsArgsSchema, filter);

const subscriber: Resolver<Root, MessageReceivedArgs> = (root, args, context) =>
  core.pubsub.asyncIterator(core.messages.triggerNames.MESSAGE_SENT);

const enhancedSubscriber = withDecodedGlobalIds(
  globalIdsArgsSchema,
  subscriber,
);

export const messageReceivedSubscriber = withFilter(
  enhancedSubscriber,
  enhancedFilter,
);

export default messageReceivedSubscriber;
