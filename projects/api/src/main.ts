import 'core-js/features/array/flat';
import 'core-js/features/array/flat-map';

import './config';
import * as core from './core';
import * as server from './server';

/**
 * Entry point of the application.
 */
export async function startApplication() {
  await core.setup.setupCore();

  handleProcessEvents();
  Promise.reject(3);

  await server.startServer();
}

function handleProcessEvents(): void {
  handleUnhandledExceptions();
  handleExit();
}

function handleUnhandledExceptions() {
  process.on('uncaughtException', logErrorAndExit);
  process.on('unhandledRejection', logErrorAndExit);
}

function logErrorAndExit(error: Error) {
  core.logger.error(error);

  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

function handleExit(): void {
  process.on('exit', async () => {
    await core.shutdown.shutdownCore();

    core.logger.info('👋 goodbye!');
  });
}
