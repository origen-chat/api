import * as core from '../../core';

import { closeServer } from './server';

export async function shutdownServer(): Promise<void> {
  core.logger.info('🔌 shutting down server...');

  await closeServer();

  core.logger.info('🔌 server shut down');
}
