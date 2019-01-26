import { cleanDatabase } from './postgres';
import { cleanCache } from './redis';

export function setupTestFramework(): void {
  beforeEach(async () => {
    await cleanDatabase();
    await cleanCache();
  });
}

export default setupTestFramework;
