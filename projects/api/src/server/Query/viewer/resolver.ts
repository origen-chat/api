import { AuthenticationError } from 'apollo-server-express';

import { isViewerAuthenticated } from '../../helpers';
import { Resolver } from '../../types';

export const resolveViewer: Resolver = (root, args, context) => {
  if (!isViewerAuthenticated(context)) {
    throw new AuthenticationError('unauthenticated');
  }

  return context.viewer;
};

export default resolveViewer;
