import 'core-js/fn/array/flat-map';
import 'core-js/fn/array/flatten';

import './config/config';
import logger from './core/logger';
import { startGraphQLServer } from './server/server';

main();

/**
 * Entry point of the application.
 */
async function main() {
  handleUnhandledExceptions();

  await startGraphQLServer();
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
