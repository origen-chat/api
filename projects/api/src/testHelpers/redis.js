const core = require('../core');

async function cleanCache() {
  await core.redis.redisClient.flushall();
}

module.exports.cleanCache = cleanCache;
