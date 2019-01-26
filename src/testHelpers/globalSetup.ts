import './dotenv';

import * as core from '../core';

import { cleanDatabase } from './postgres';
import { cleanCache } from './redis';

async function globalSetup() {
  await core.core.startCore();

  await cleanDatabase();
  await cleanCache();
}

module.exports = globalSetup;
