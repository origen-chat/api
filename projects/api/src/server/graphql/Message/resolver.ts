import * as shared from '../shared';
import { resolver as resolveChannel } from './channel';

const messageResolver = {
  id: shared.resolvers.resolveNodeId,
  channel: resolveChannel,
};

export default messageResolver;
