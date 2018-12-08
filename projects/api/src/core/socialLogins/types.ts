import { ID, Identifiable, Timestamps } from '../types';

export type SocialLogin = Readonly<{
  userId: ID;
}> &
  Identifiable &
  SocialCredentials &
  Timestamps;

export type SocialCredentials = Readonly<{
  providerUserId: ProviderUserId;
  provider: Provider;
}>;

export type ProviderUserId = string;

export enum Provider {
  Google = 'google',
  GitHub = 'github',
}
