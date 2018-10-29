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

  await server.startServer();
}

function handleProcessEvents(): void {
  handleUnhandledRejection();
  handleUncaughtException();

  handleExit();
}

function handleUnhandledRejection() {
  process.on('unhandledRejection', unhandledRejection => {
    core.logger.error(`☢  Unhandled rejection: ${unhandledRejection}`);

    process.exit(1);
  });
}

function handleUncaughtException() {
  process.on('uncaughtException', uncaughtException => {
    core.logger.error(`☢  Uncaught exception: ${uncaughtException}`);

    process.exit(1);
  });
}

function handleExit(): void {
  process.on('exit', async () => {
    await core.shutdown.shutdownCore();

    core.logger.info('👋 goodbye!');
  });
}
