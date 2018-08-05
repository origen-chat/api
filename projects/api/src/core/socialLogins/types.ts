export type SocialLogin = Readonly<{
  id: number;
  userId: number;
}> &
  SocialCredentials;

export type SocialCredentials = Readonly<{
  uid: string;
  provider: Provider;
}>;

export type Provider = 'google' | 'github';
