import * as shared from '../shared';
import { resolver as resolveChannel } from './channel';
import { resolver as resolveSender } from './sender';

const messageResolver = {
  id: shared.resolvers.resolveNodeId,
  channel: resolveChannel,
  sender: resolveSender,
};

export default messageResolver;
