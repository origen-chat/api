import * as shared from '../shared';
import { resolver as resolveChannel } from './channel';
import { resolver as resolveIsSystemMessage } from './isSystemMessage';
import { resolver as resolveSender } from './sender';

const messageResolver = {
  id: shared.resolvers.resolveNodeId,
  channel: resolveChannel,
  sender: resolveSender,
  isSystemMessage: resolveIsSystemMessage,
};

export default messageResolver;
