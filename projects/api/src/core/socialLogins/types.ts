import { ID, Identifiable, Timestamps } from '../types';

export type SocialLogin = Readonly<{
  userId: ID;
}> &
  Identifiable &
  Timestamps &
  SocialCredentials;

export type SocialCredentials = Readonly<{
  providerUserId: ProviderUserId;
  provider: Provider;
}>;

export type ProviderUserId = string;

export type Provider = 'google' | 'github';
