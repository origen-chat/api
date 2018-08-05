import { ApolloError, AuthenticationError } from 'apollo-server-express';

import { users } from '../../core';
import { Resolver, Root } from '../types';

type ResolveUserArgs = {
  uniqueUsername: users.UniqueUsername;
};

export const resolveUser: Resolver<Root, ResolveUserArgs> = async (
  root,
  args,
) => {
  const { uniqueUsername } = args;

  const user = await users.getUserByUniqueUsername(uniqueUsername);

  if (!user) {
    throw new ApolloError('user not found');
  }

  return user;
};

export const resolveViewer: Resolver<Root> = (root, args, { viewer }) => {
  if (!viewer) {
    throw new AuthenticationError('viewer not authenticated');
  }

  return viewer;
};

const queryResolver = {
  user: resolveUser,
  viewer: resolveViewer,
};

export default queryResolver;
