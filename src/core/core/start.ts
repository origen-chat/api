import { maybeStartBackgroundWorkers } from '../backgroundWorkers';
import { startDB } from '../db';
import { initializeErrorTracking } from '../errorTracking';
import { startJobQueues } from '../jobQueues';
import { startPubsub } from '../pubsub';
import { startRedis } from '../redis';

// eslint-disable-next-line import/no-mutable-exports
export let isStarted = false;

/**
 * Setups and initializes everything needed in the core.
 */
export async function startCore(): Promise<void> {
  initializeErrorTracking();

  await Promise.all([startRedis(), startDB(), startPubsub(), startJobQueues()]);

  await maybeStartBackgroundWorkers();

  isStarted = true;
}
