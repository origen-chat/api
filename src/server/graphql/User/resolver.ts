import * as shared from '../shared';
import { resolver as resolveIsViewer } from './isViewer';
import { resolver as resolveSettings } from './settings';
import { resolver as resolveWorkspaces } from './workspaces';

const userResolver = {
  id: shared.resolvers.resolveNodeId,
  isViewer: resolveIsViewer,
  workspaces: resolveWorkspaces,
  settings: resolveSettings,
};

export default userResolver;
