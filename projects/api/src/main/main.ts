import 'core-js/features/array/flat';
import 'core-js/features/array/flat-map';

import '../config';
import * as core from '../core';
import * as server from '../server';
import { handleProcessEvents } from './events';
import { handleSignals } from './signals';

/**
 * Entry point of the application.
 */
export async function startApplication(): Promise<void> {
  core.logger.info('👋 starting application...');

  await core.setup.setupCore();
  await server.startServer();

  handleProcessEvents();
  handleSignals();
}
