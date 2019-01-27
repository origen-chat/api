import * as core from '../core';

import { cleanDatabase } from './postgres';
import { cleanCache } from './redis';

setupTestFramework();

function setupTestFramework(): void {
  beforeAll(async () => {
    await core.core.startCore();
  });

  beforeEach(async () => {
    await cleanDatabase();
    await cleanCache();
  });

  afterAll(async () => {
    await core.core.shutdownCore();
  });
}
