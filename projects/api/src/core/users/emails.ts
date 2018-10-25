import { DBOptions } from '../types';
import { User } from './types';
import { doUpdateUser, DoUpdateUserArgs } from './update';

export async function verifyEmail(
  user: User,
  options: DBOptions = {},
): Promise<User> {
  if (!user.unverifiedEmail) {
    throw new Error("user doesn't have an unverified email to verify");
  }

  const data: DoUpdateUserArgs = {
    email: user.unverifiedEmail,
    unverifiedEmail: null,
  };

  const updatedUser = await doUpdateUser(user, data, options);

  return updatedUser;
}
