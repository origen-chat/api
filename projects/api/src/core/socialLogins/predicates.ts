import { SocialLogin } from './types';

export function isSocialLogin(value: any): value is SocialLogin {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.userId &&
    value.providerUserId &&
    value.provider
  );
}
