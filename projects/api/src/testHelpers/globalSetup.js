const registerBabel = require('@babel/register');

registerBabel({ extensions: ['.js', '.ts'] });

const { cleanDatabase } = require('./postgres');
const { cleanCache } = require('./redis');

async function globalSetup() {
  await cleanDatabase();
  await cleanCache();
}

module.exports = globalSetup;
