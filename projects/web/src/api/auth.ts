import { env } from '../config';

const authEndpoint = `${env.apiEndpoint}/auth`;

function getCallbackUrl(provider: string, code: string): string {
  return `${authEndpoint}/${provider}/callback?code=${code}`;
}

export async function getAuthToken(
  provider: string,
  code: string,
): Promise<string> {
  const res = await fetch(getCallbackUrl(provider, code));
  const { token } = await res.json();

  return token;
}

export async function refreshAuthToken(oldAuthToken: string): Promise<string> {
  const url = `${authEndpoint}/refresh`;
  const body = JSON.stringify({ token: oldAuthToken });
  const headers = new Headers({ 'Content-Type': 'application/json' });

  const res = await fetch(url, { method: 'POST', body, headers });
  const { token } = await res.json();

  return token;
}
