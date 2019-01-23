const core = require('../core/index.ts');

const { cleanDatabase } = require('./postgres');
const { cleanCache } = require('./redis');

async function globalTeardown() {
  await cleanDatabase();
  await cleanCache();

  await core.shutdown.shutdownCore();
}

module.exports = globalTeardown;
