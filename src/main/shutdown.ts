import * as core from '../core';
import * as server from '../server';

export type ShutdownApplicationArgs = Readonly<{ exitCode?: number }>;

/**
 * Gracefully shuts down the application.
 */
export async function shutdownApplication({
  exitCode = 0,
}: ShutdownApplicationArgs = {}): Promise<void> {
  try {
    await server.shutdownServer();
    await core.core.shutdownCore();
  } catch (error) {
    core.logger.error(`😕 error thrown when shutting down: ${error}`);
  }

  core.logger.info('👋 goodbye!');

  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(exitCode);
}
