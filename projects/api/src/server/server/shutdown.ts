import * as core from '../../core';
import { closeHttpServer } from './httpServer';

export async function shutdownServer(): Promise<void> {
  core.logger.info('🔌 shutting down server...');

  await closeHttpServer();

  core.logger.info('🔌 server shut down');
}
