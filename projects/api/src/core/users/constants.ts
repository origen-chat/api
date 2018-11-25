import ms from 'ms';

export const usersTableName = 'users';

export const usernameIdentifierLength = 4;
export const maxUsernameCount = 10 ** usernameIdentifierLength - 1;

export const userRedisKeyNamespace = 'user';

export const defaultUserCacheExpirationInSeconds = ms('6 hours');
