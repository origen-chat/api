import { socialLogins } from '../../core';

export function makeOauth2CallbackUrl(provider?: socialLogins.Provider) {
  const parameter = ':provider';
  return `/auth/${provider || parameter}/callback`;
}

export function makeOauth2RequestUrl(provider?: socialLogins.Provider) {
  const parameter = ':provider';
  return `/auth/${provider || parameter}`;
}
