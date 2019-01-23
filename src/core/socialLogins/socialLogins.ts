import { DBOptions } from '../types';
import { User } from '../users';

import { createSocialLogin, CreateSocialLoginArgs } from './creation';
import { SocialCredentials, SocialLogin } from './types';

export async function linkSocialCredentialsToUser(
  user: User,
  socialCredentials: SocialCredentials,
  options: DBOptions = {},
): Promise<SocialLogin> {
  const args: CreateSocialLoginArgs = { user, ...socialCredentials };

  const socialLogin = await createSocialLogin(args, options);

  return socialLogin;
}
