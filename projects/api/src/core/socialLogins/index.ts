export {
  SocialCredentials,
  SocialLogin,
  Provider,
  ProviderUserId,
} from './types';
export { providers, socialLoginsTableName } from './constants';
export { isSocialLogin } from './predicates';
export {
  getUserBySocialCredentials,
  linkSocialCredentialsToUser,
} from './socialLogins';
