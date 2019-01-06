import * as core from '../../core';
import { getUserFromJWT } from './jwt';

export async function getUserFromAuthorizationHeader(
  authorizationHeader: core.types.Undefinable<string>,
): Promise<core.types.Nullable<core.users.User>> {
  if (!authorizationHeader) {
    return null;
  }

  const token = extractJWTFromAuthorizationHeader(authorizationHeader);

  let user;

  try {
    user = await getUserFromJWT(token);
  } catch {
    return null;
  }

  return user;
}

function extractJWTFromAuthorizationHeader(
  authorizationHeader: string,
): string {
  const tokenType = 'Bearer';

  const [, token] = authorizationHeader.split(`${tokenType} `);

  return token;
}
