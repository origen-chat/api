import * as shared from '../shared';
import { resolver as resolveChannel } from './channel';
import { resolver as resolveChannels } from './channels';
import { resolver as resolveRandomLoadingMessage } from './randomLoadingMessage';

const workspaceResolver = {
  id: shared.resolvers.resolveNodeId,
  channel: resolveChannel,
  channels: resolveChannels,
  randomLoadingMessage: resolveRandomLoadingMessage,
};

export default workspaceResolver;
