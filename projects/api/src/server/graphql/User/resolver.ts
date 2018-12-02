import * as shared from '../shared';
import { resolver as resolveIsViewer } from './isViewer';
import { resolver as resolveWorkspaces } from './workspaces';

const userResolver = {
  id: shared.resolvers.resolveNodeId,
  isViewer: resolveIsViewer,
  workspaces: resolveWorkspaces,
};

export default userResolver;
