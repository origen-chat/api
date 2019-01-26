const { cleanDatabase } = require('./postgres');
const { cleanCache } = require('./redis');

async function setupTestFramework() {
  beforeEach(async () => {
    await cleanDatabase();
    await cleanCache();
  });
}

module.exports = setupTestFramework;
