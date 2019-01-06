import { UserInputError } from 'apollo-server-core';
import * as core from '../../../../core';
import { Resolver, Root } from '../../../types';
import { NotFoundableEntity, NotFoundError } from '../../errors';
import { withDecodedGlobalIds } from '../../helpers';
import { NodeType } from '../../types';

export type ResolveUserArgs = Partial<core.users.UniqueUsername> &
  Partial<Readonly<{ id: core.types.ID; email: core.types.Email }>>;

export const resolveUser: Resolver<
  Root,
  ResolveUserArgs,
  core.users.User
> = async (root, args, context) => {
  const { id: userId, username, usernameIdentifier, email } = args;

  let user: core.types.Nullable<core.users.User> = null;

  if (userId) {
    user = await context.loaders.userById.load(userId);
  } else if (username && usernameIdentifier) {
    user = await context.loaders.userByUniqueUsername.load({
      username,
      usernameIdentifier,
    });
  } else if (email) {
    user = await context.loaders.userByEmail.load(email);
  } else {
    throw new UserInputError(
      'must provide user id, username and username identifier, or email',
    );
  }

  if (!user) {
    throw new NotFoundError({ entity: NotFoundableEntity.User });
  }

  return user;
};

const enhancedResolver = withDecodedGlobalIds(
  {
    id: NodeType.User,
  },
  resolveUser,
);

export default enhancedResolver;
