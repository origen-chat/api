import { ApolloError } from 'apollo-server-express';

import { users } from '../../core';

const queryResolver = {
  user: resolveUser,
};

async function resolveUser(root: any, args: any): Promise<users.User> {
  const { uniqueUsername } = args;

  const user = await users.getUserByUniqueUsername(uniqueUsername);

  if (!user) {
    throw new ApolloError('user not found');
  }

  return user;
}

export default queryResolver;
