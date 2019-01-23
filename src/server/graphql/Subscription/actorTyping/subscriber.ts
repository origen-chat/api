import { withFilter } from 'graphql-subscriptions';

import * as core from '../../../../core';
import { Resolver, Root } from '../../../types';
import { withDecodedGlobalIds } from '../../helpers';
import { NodeType } from '../../types';

import { ActorTypingArgs, ActorTypingPayload } from './types';

const filter: Resolver<ActorTypingPayload, ActorTypingArgs> = async (
  payload,
  args,
  context,
) => {
  if (payload.channel.id !== args.channelId) {
    return false;
  }

  return true;
};

const globalIdsArgsSchema = {
  channelId: NodeType.Channel,
};

const enhancedFilter = withDecodedGlobalIds(globalIdsArgsSchema, filter);

const subscriber: Resolver<Root, ActorTypingArgs> = (root, args, context) =>
  core.pubsub.asyncIterator(core.presence.pubsubKeys.ACTOR_TYPING);

const enhancedSubscriber = withDecodedGlobalIds(
  globalIdsArgsSchema,
  subscriber,
);

export const actorTypingSubscriber = withFilter(
  enhancedSubscriber,
  enhancedFilter,
);

export default actorTypingSubscriber;
