import * as shared from '../shared';
import { resolver as resolveChannel } from './channel';

const workspaceResolver = {
  id: shared.resolvers.resolveNodeId,
  channel: resolveChannel,
};

export default workspaceResolver;
