import { overrideProcessEnv } from './dotenv';

async function globalSetup() {
  await overrideProcessEnv();
}

module.exports = globalSetup;
