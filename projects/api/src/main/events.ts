import * as core from '../core';
import { shutdownApplication } from './shutdown';

export function handleProcessEvents(): void {
  handleUnhandledRejection();
  handleUncaughtException();
}

function handleUnhandledRejection(): void {
  process.on('unhandledRejection', async unhandledRejection => {
    core.logger.error(`☢  Unhandled rejection: ${unhandledRejection}`);

    await shutdownApplication({ exitCode: 1 });
  });
}

function handleUncaughtException(): void {
  process.on('uncaughtException', async uncaughtException => {
    core.logger.error(`☢  Uncaught exception: ${uncaughtException}`);

    await shutdownApplication({ exitCode: 1 });
  });
}
