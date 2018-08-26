import * as storage from '../storage';

const tokenKey = 'authToken';

export default tokenKey;

export async function isAuthenticated(): Promise<boolean> {
  const token = await getToken();

  return !!token;
}

export async function getToken(): Promise<string | undefined> {
  const token = await storage.get(tokenKey);

  return token;
}

export async function setToken(token: string): Promise<void> {
  await storage.set(tokenKey, token);
}

export async function removeToken(): Promise<void> {
  await storage.remove(tokenKey);
}
