import { initializeErrorTracking } from '../errorTracking';

/**
 * Setups and initializes everything needed in the core.
 */
export async function setupCore(): Promise<void> {
  initializeErrorTracking();
}
