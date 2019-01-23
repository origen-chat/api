import { DBOptions } from '../types';

import { User } from './types';
import { updateUser, UpdateUserArgs } from './update';

export async function verifyEmail(
  user: User,
  options: DBOptions = {},
): Promise<User> {
  if (!user.unverifiedEmail) {
    throw new Error("user doesn't have an unverified email to verify");
  }

  const data: UpdateUserArgs = {
    email: user.unverifiedEmail,
    unverifiedEmail: null,
  };

  const updatedUser = await updateUser(user, data, options);

  return updatedUser;
}
