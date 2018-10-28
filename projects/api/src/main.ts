import 'core-js/features/array/flat';
import 'core-js/features/array/flat-map';

import './config';
import * as core from './core';
import * as server from './server';

/**
 * Entry point of the application.
 */
export async function startApplication() {
  core.errorTracking.initializeErrorTracking();
  handleUnhandledExceptions();

  await server.startServer();
}

function handleUnhandledExceptions() {
  process.once('uncaughtException', logErrorAndExit);
  process.once('unhandledRejection', logErrorAndExit);
}

function logErrorAndExit(error: Error) {
  core.logger.error(error);

  const exitCode = 1;

  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(exitCode);
}
