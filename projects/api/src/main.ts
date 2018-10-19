import 'core-js/features/array/flat';
import 'core-js/features/array/flat-map';

import './config';
import logger from './core/logger';
import { startServer } from './server/server';

/**
 * Entry point of the application.
 */
export async function startApplication() {
  handleUnhandledExceptions();

  await startServer();
}

function handleUnhandledExceptions() {
  process.once('uncaughtException', logErrorAndExit);
  process.once('unhandledRejection', logErrorAndExit);
}

function logErrorAndExit(error: Error) {
  const exitCode = 1;

  logger.error(error);

  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(exitCode);
}
