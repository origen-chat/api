const registerBabel = require('@babel/register');

registerBabel({ extensions: ['.js', '.ts'] });

const core = require('../core/index.ts');

const { cleanDatabase } = require('./postgres');
const { cleanCache } = require('./redis');

async function globalSetup() {
  await core.core.startCore();

  await cleanDatabase();
  await cleanCache();
}

module.exports = globalSetup;
