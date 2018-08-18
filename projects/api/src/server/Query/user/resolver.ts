import { users } from '../../../core';
import { NotFoundError } from '../../errors';
import { Resolver, Root } from '../../types';

export type ResolveUserArgs = users.UniqueUsername;

export const resolveUser: Resolver<Root, ResolveUserArgs, users.User> = async (
  root,
  args,
) => {
  const { username, usernameIdentifier } = args;

  const user = await users.getUserByUniqueUsername({
    username,
    usernameIdentifier,
  });

  if (!user) {
    throw new NotFoundError('user not found');
  }

  return user;
};

export default resolveUser;
