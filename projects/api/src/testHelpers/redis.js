const core = require('../core/index.ts');

async function cleanCache() {
  await core.redis.redisClient.flushall();
}

module.exports.cleanCache = cleanCache;
