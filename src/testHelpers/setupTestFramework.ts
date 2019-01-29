import { startCore } from '../core/core/start';
import { shutdownCore } from '../core/core/shutdown';

import { cleanDatabase } from './postgres';
import { cleanCache } from './redis';

setupTestFramework();

function setupTestFramework(): void {
  beforeAll(async () => {
    await startCore();
  });

  beforeEach(async () => {
    await cleanDatabase();
    await cleanCache();
  });

  afterAll(async () => {
    await shutdownCore();
  });
}
