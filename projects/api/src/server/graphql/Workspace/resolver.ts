import * as shared from '../shared';
import { resolver as resolveChannel } from './channel';
import { resolver as resolveChannels } from './channels';

const workspaceResolver = {
  id: shared.resolvers.resolveNodeId,
  channel: resolveChannel,
  channels: resolveChannels,
};

export default workspaceResolver;
