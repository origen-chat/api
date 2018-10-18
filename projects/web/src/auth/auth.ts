import * as storage from '../storage';

export type AuthToken = string;

/**
 * The key to look up the auth token.
 */
const tokenKey = 'authToken';

export default tokenKey;

/**
 * Returns `true` if the viewer is authenticated.
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getToken();

  return !!token;
}

/**
 * Returns the auth token if it has been persisted.
 */
export async function getToken(): Promise<AuthToken | undefined> {
  const token = await storage.get(tokenKey);

  return token;
}

/**
 * Persists the auth token.
 */
export async function setToken(token: AuthToken): Promise<void> {
  await storage.set(tokenKey, token);
}

/**
 * Removes the auth token.
 */
export async function removeToken(): Promise<void> {
  await storage.remove(tokenKey);
}
