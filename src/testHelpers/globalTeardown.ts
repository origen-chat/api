import * as core from '../core';

import { cleanDatabase } from './postgres';
import { cleanCache } from './redis';

async function globalTeardown() {
  await cleanDatabase();
  await cleanCache();

  await core.core.shutdownCore();
}

module.exports = globalTeardown;
