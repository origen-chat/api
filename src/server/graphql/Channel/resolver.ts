import * as shared from '../shared';
import { resolver as resolveMessages } from './messages';
import { resolver as resolveWorkspace } from './workspace';

const channelResolver = {
  id: shared.resolvers.resolveNodeId,
  workspace: resolveWorkspace,
  messages: resolveMessages,
};

export default channelResolver;
