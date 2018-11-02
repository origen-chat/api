import { UserInputError } from 'apollo-server-core';
import * as core from '../../../../core';
import { Resolver, Root } from '../../../types';
import { NotFoundError } from '../../errors';

export type ResolveUserArgs = Partial<core.users.UniqueUsername> &
  Partial<Readonly<{ id: core.types.ID; email: core.types.Email }>>;

export const resolveUser: Resolver<
  Root,
  ResolveUserArgs,
  core.users.User
> = async (root, args) => {
  const { id: userId, username, usernameIdentifier, email } = args;

  let user: core.types.Nullable<core.users.User> = null;

  if (userId) {
    user = await core.users.getUserById(userId);
  } else if (username && usernameIdentifier) {
    user = await core.users.getUserByUniqueUsername({
      username,
      usernameIdentifier,
    });
  } else if (email) {
    throw new UserInputError(
      'must provide user id, username and username identifier, or email',
    );
  }

  if (!user) {
    throw new NotFoundError({ entity: 'user' });
  }

  return user;
};

export default resolveUser;
