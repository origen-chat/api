import * as shared from '../shared';

import { resolver as resolveIsCustom } from './isCustom';

const botResolver = {
  id: shared.resolvers.resolveNodeId,
  isCustom: resolveIsCustom,
};

export default botResolver;
