import { users } from '../../core';

const userResolver = {
  uniqueUsername: resolveUniqueUsername,
};

function resolveUniqueUsername(user: users.User): users.UniqueUsername {
  const uniqueUsername: users.UniqueUsername = {
    username: user.username,
    usernameIdentifier: user.usernameIdentifier,
  };

  return uniqueUsername;
}

export default userResolver;
