import { resolver as resolveChannel } from './channel';
import { resolver as resolveUser } from './user';
import { resolver as resolveViewer } from './viewer';
import { resolver as resolveWorkspace } from './workspace';

const queryResolver = {
  user: resolveUser,
  channel: resolveChannel,
  workspace: resolveWorkspace,
  viewer: resolveViewer,
};

export default queryResolver;
