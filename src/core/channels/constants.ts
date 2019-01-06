import ms from 'ms';

export const channelsTableName = 'channels';

/**
 * The maximum amount of users in a direct messages channel.
 */
export const maxUsersInDirectMessagesChannel = 20;

/**
 * The name of the initial default channel upon workspace creation.
 */
export const initialDefaultChannelName = 'general';

export const channelRedisKeyNamespace = 'channel';

export const defaultChannelCacheExpirationInSeconds = ms('6 hours');
